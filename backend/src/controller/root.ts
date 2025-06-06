import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import {
  calculateMac,
  calculateSha256,
  decodePayload,
  deriveRequestMacKey,
  deriveResponseMacKey,
  extractSubFromAccessToken,
} from "@usagiverify/common";
import type { honoApp } from "@usagiverify/manpoko";
import { exec } from "child_process";
import { Hono } from "hono";
import { hc } from "hono/client";
import config from "../config";
import { mintToken } from "../lib/viem";

const request = Type.Object({
  address: Type.String(),
});

export const root = new Hono()
  .post("/issue-at", tbValidator("json", request), async (c) => {
    /**
     * アクセストークン発行
     * アドレスをもとにアクセストークンを発行する
     * 後のリクエストでこのアクセストークンを使う
     */
    const { address } = c.req.valid("json");

    const client = hc<typeof honoApp>(config.manpokoUrl);
    const response = await client.index.$post({
      json: {
        sub: address,
      },
    });
    if (response.status !== 200) {
      return c.text("Failed to issue access token", 500);
    }
    const { accessToken } = await response.json();
    if (!accessToken) {
      return c.text("Failed to issue access token", 500);
    }

    return c.json({
      accessToken,
    });
  })
  .post(
    "/get-info",
    tbValidator("json", Type.Object({ accessToken: Type.String() })),
    async (c) => {
      /**
       * アクセストークンをもとに情報を取得する
       * データを取得するだけで、ZKPは実行しない。
       * ZKPをする前の対象データ確認のために用いる
       *
       * 例:
       * curl https://usagiverify.ouchiserver.aokiapp.com/get-info -X POST --json '{"accessToken": "eyJzdWIiOiJmb28iLCJraWQiOiJhY2Nlc3NfdG9rZW4iLCJpc3MiOiJtYW5wb2tvIn0="}'
       * >> {"payload":[{"key":"sub","value":"foo"},{"key":"val2022","value":"50000"},{"key":"val2023","value":"100000"},{"key":"val2024","value":"200000"}],"macValid":true,"hashValid":true}
       *
       * これの意味するところは、sub(利用者のアドレス)がfooで、例えば、医療費のデータを採ってきたとして、2022年の値が50000、2023年の値が100000、2024年の値が200000であることを示す。またMACが正しいこと、SHA256のハッシュ値が正しいこと、ゆえに、改ざんされていないことを示す。
       */
      const { accessToken } = c.req.valid("json");

      const client = hc<typeof honoApp>(config.manpokoUrl);
      const response = await client.selfinfo.$post({
        json: {
          accessToken,
        },
      });
      if (response.status !== 200) {
        return c.text("Failed to get info", 500);
      }
      const { payload, mac, sha256Payload } = await response.json();

      const reproducedMac = calculateMac(
        deriveResponseMacKey(Buffer.from(config.masterSecret, "utf-8")),
        Buffer.from(payload, "hex")
      );

      return c.json({
        payload: decodePayload(Buffer.from(payload, "hex")),
        macValid: mac === reproducedMac.toString("hex"),
        hashValid:
          sha256Payload ===
          calculateSha256(Buffer.from(payload, "hex")).toString("hex"),
      });
    }
  )
  .post(
    "/prove",
    tbValidator("json", Type.Object({ accessToken: Type.String() })),
    async (c) => {
      /**
       * アクセストークンをもとに情報を取得し、それをもとにZKPを実行してNFTを発行する
       */
      // client mac validation phase
      const { accessToken } = c.req.valid("json");
      const sub = extractSubFromAccessToken(accessToken);
      if (!sub) {
        return c.text("Invalid access token", 400);
      }

      const reqMacKey = deriveRequestMacKey(
        Buffer.from(config.masterSecret, "utf-8")
      );

      const reqMac = calculateMac(reqMacKey, Buffer.from(accessToken, "utf-8"));

      const client = hc<typeof honoApp>(config.manpokoUrl);
      const response = await client.selfinfo.$post({
        json: {
          accessToken,
          mac: reqMac.toString("hex"),
        },
      });
      if (response.status !== 200) {
        return c.text("Failed to get info", 500);
      }
      const { payload, mac, sha256Payload } = await response.json();
      const reproducedMac = calculateMac(
        deriveResponseMacKey(Buffer.from(config.masterSecret, "utf-8")),
        Buffer.from(payload, "hex")
      );

      if (
        mac !== reproducedMac.toString("hex") ||
        sha256Payload !==
          calculateSha256(Buffer.from(payload, "hex")).toString("hex")
      ) {
        return c.text("Unauthorized", 401);
      }

      const param = {
        master_secret: Buffer.from(config.masterSecret, "utf-8").toString(
          "hex"
        ),
        req_payload: Buffer.from(accessToken, "utf-8").toString("hex"),
        req_payload_mac: reqMac.toString("hex"),
        res_payload: payload,
        res_payload_mac: mac,
      };
      const paramJson = JSON.stringify(param);
      if (!config.skipProve) {
        try {
          const { stdout, stderr } = await new Promise<{
            stdout: string;
            stderr: string;
          }>((resolve, reject) => {
            exec(
              `cd dist && ./prover --param '${paramJson}' --prove`,
              (error, stdout, stderr) => {
                if (error) {
                  reject({ error, stderr });
                } else {
                  resolve({ stdout, stderr });
                }
              }
            );
          });
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        } catch (error: any) {
          console.error(`exec error: ${error}`);
          return c.text("Failed to prove", 500);
        }
      } else {
        console.log("skip prove");
      }

      const decPl = decodePayload(Buffer.from(payload, "hex"));

      const val2024 = parseInt(
        decPl.find((item) => item.key === "val2024")!.value
      );

      try {
        await mintToken(
          sub,
          BigInt(1), // 医療費: Medical expenses NFT
          BigInt(val2024),
          "ipfs://bafkreibqlgz36cado4gmjf5nfbrltkxuz5z2merrcd73caay7xhvtbapem"
        );
      } catch (error) {
        console.error("mint error", error);

        return c.text("Failed to mint", 500);
      }
      console.log("mint success");

      return c.json({
        ok: true,
      });
    }
  );
