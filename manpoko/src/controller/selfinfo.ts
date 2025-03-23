import { Hono } from "hono";
import config from "../config";

import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import {
  encodePayload,
  calculateMac,
  calculateSha256,
  deriveResponseMacKey,
  deriveRequestMacKey,
} from "@usagiverify/common";

const reqSchema = Type.Object({
  accessToken: Type.String(),
  mac: Type.Optional(Type.String()),
});

export const selfinfo = new Hono().post(
  "/",
  tbValidator("json", reqSchema),
  (c) => {
    const accessToken = c.req.valid("json").accessToken;
    if (!accessToken) {
      return c.text("Unauthorized", 401);
    }
    const reqMac = c.req.valid("json").mac;
    if (reqMac) {
      const reqMacKey = deriveRequestMacKey(
        Buffer.from(config.masterSecret, "utf-8")
      );

      const expReqMac = calculateMac(
        reqMacKey,
        Buffer.from(accessToken, "utf-8")
      );
      if (reqMac !== expReqMac.toString("hex")) {
        return c.text("Unauthorized", 401);
      }
    }
    const sub = extractSubFromAccessToken(accessToken);
    if (!sub) {
      return c.text("Unauthorized", 401);
    }

    const payload = encodePayload([
      { key: "sub", value: sub },
      { key: "val2022", value: "50000" },
      { key: "val2023", value: "100000" },
      { key: "val2024", value: "200000" },
    ]);

    const respMacKey = deriveResponseMacKey(
      Buffer.from(config.masterSecret, "utf-8")
    );
    const mac = calculateMac(respMacKey, payload);

    const sha256Payload = calculateSha256(payload);

    return c.json({
      payload: payload.toString("hex"),
      mac: mac.toString("hex"),
      sha256Payload: sha256Payload.toString("hex"),
    });
  }
);

function extractSubFromAccessToken(accessToken: string): string | undefined {
  const jsonAccessToken = Buffer.from(accessToken, "base64").toString("utf-8");
  const parsedAccessToken = JSON.parse(jsonAccessToken);
  return parsedAccessToken.sub;
}
