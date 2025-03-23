import { Hono } from "hono";
import config from "../config";

import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import {
  encodePayload,
  calculateMac,
  calculateSha256,
  deriveResponseMacKey,
} from "@usagiverify/common";

const reqSchema = Type.Object({
  accessToken: Type.String(),
});

export const selfinfo = new Hono().post(
  "/",
  tbValidator("json", reqSchema),
  (c) => {
    const accessToken = c.req.valid("json").accessToken;
    if (!accessToken) {
      return c.text("Unauthorized", 401);
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
