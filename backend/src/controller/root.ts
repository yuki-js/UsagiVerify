import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import { Hono } from "hono";
import { hc } from "hono/client";
import type { honoApp } from "@usagiverify/manpoko";
import config from "../config";
import {
  deriveResponseMacKey,
  calculateMac,
  decodePayload,
  calculateSha256,
} from "@usagiverify/common";

const request = Type.Object({
  address: Type.String(),
});

export const root = new Hono()
  .post("/issue-at", tbValidator("json", request), async (c) => {
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
  );
