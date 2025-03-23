import { Hono } from "hono";
import crypto from "node:crypto";
import config from "../config";

import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";

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

function encodePayload(payload: Array<{ key: string; value: string }>) {
  // precondition check
  if (!Array.isArray(payload)) {
    throw new Error("Invalid payload");
  }
  if (payload.length === 0) {
    throw new Error("Payload is empty");
  }
  for (const { key, value } of payload) {
    if (typeof key !== "string" || typeof value !== "string") {
      throw new Error("Invalid payload");
    }
    const keyBuffer = Buffer.from(key, "utf-8");
    const valueBuffer = Buffer.from(value, "utf-8");
    if (keyBuffer.length > 8 || keyBuffer.length === 0) {
      throw new Error("Invalid payload");
    }
    if (valueBuffer.length > 8 || valueBuffer.length === 0) {
      throw new Error("Invalid payload");
    }
    if (keyBuffer.toString("utf-8") !== key) {
      throw new Error("Invalid payload");
    }
    if (valueBuffer.toString("utf-8") !== value) {
      throw new Error("Invalid payload");
    }
  }

  // encoding
  const encodedPayloadRow = payload.map(({ key, value }) => {
    const keyBufferFragment = Buffer.from(key, "utf-8");
    const valueBufferFragment = Buffer.from(value, "utf-8");

    const keyBuffer = Buffer.alloc(8);
    const valueBuffer = Buffer.alloc(56);

    keyBufferFragment.copy(keyBuffer);
    valueBufferFragment.copy(valueBuffer);

    const rowBuffer = Buffer.concat([keyBuffer, valueBuffer]);
    return rowBuffer;
  });

  const encodedPayload = Buffer.concat(encodedPayloadRow);

  // postcondition check
  // check length that aligns to 64 bytes
  if (encodedPayload.length % 64 !== 0) {
    throw new Error("Invalid payload");
  }

  return encodedPayload;
}

function calculateSha256(input: Buffer): Buffer {
  // sha256(payload)
  const hash = crypto.createHash("sha256");
  hash.update(input);
  const digest = hash.digest();
  return digest;
}
function calculateMac(derivedKey: Buffer, payload: Buffer): Buffer {
  // sha256(key + sha256(payload))
  return calculateSha256(Buffer.concat([derivedKey, calculateSha256(payload)]));
}

function deriveResponseMacKey(masterSecret: Buffer): Buffer {
  // sha256(masterSecret + "response")
  return calculateSha256(
    Buffer.concat([masterSecret, Buffer.from("response", "utf-8")])
  );
}
