import crypto from "node:crypto";

export function decodePayload(payload: Buffer) {
  // precondition check
  if (!Buffer.isBuffer(payload)) {
    throw new Error("Invalid payload");
  }
  if (payload.length === 0) {
    throw new Error("Payload is empty");
  }
  if (payload.length % 64 !== 0) {
    throw new Error("Invalid payload");
  }

  const decodedPayload = [];
  for (let i = 0; i < payload.length; i += 64) {
    const rowBuffer = payload.subarray(i, i + 64);
    const keyBuffer = rowBuffer.subarray(0, SPLIT_SIZE);
    const valueBuffer = rowBuffer.subarray(SPLIT_SIZE, 64);

    const key = keyBuffer.toString("utf-8").replace(/\0/g, "");
    const value = valueBuffer.toString("utf-8").replace(/\0/g, "");

    decodedPayload.push({ key, value });
  }

  return decodedPayload;
}

const SPLIT_SIZE = 16;
export function encodePayload(payload: Array<{ key: string; value: string }>) {
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
    if (keyBuffer.length > SPLIT_SIZE || keyBuffer.length === 0) {
      throw new Error("Invalid payload");
    }
    if (valueBuffer.length > 64 - SPLIT_SIZE || valueBuffer.length === 0) {
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

    const keyBuffer = Buffer.alloc(SPLIT_SIZE);
    const valueBuffer = Buffer.alloc(64 - SPLIT_SIZE);

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

export function calculateSha256(input: Buffer): Buffer {
  // sha256(payload)
  const hash = crypto.createHash("sha256");
  hash.update(input);
  const digest = hash.digest();
  return digest;
}
export function calculateMac(derivedKey: Buffer, payload: Buffer): Buffer {
  // sha256(key + sha256(payload))
  return calculateSha256(Buffer.concat([derivedKey, calculateSha256(payload)]));
}

export function deriveResponseMacKey(masterSecret: Buffer): Buffer {
  // sha256(masterSecret + "response")
  return calculateSha256(
    Buffer.concat([masterSecret, Buffer.from("response", "utf-8")])
  );
}

export function deriveRequestMacKey(masterSecret: Buffer): Buffer {
  // sha256(masterSecret + "request")
  return calculateSha256(
    Buffer.concat([masterSecret, Buffer.from("request", "utf-8")])
  );
}

export function extractSubFromAccessToken(
  accessToken: string
): string | undefined {
  const jsonAccessToken = Buffer.from(accessToken, "base64").toString("utf-8");
  const parsedAccessToken = JSON.parse(jsonAccessToken);
  return parsedAccessToken.sub;
}
