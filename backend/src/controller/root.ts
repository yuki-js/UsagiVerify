import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import { Hono } from "hono";
import { hc } from "hono/client";
import type { honoApp } from "@usagiverify/manpoko";
import config from "../config";

const request = Type.Object({
  address: Type.String(),
});

export const root = new Hono().post(
  "/issue-at",
  tbValidator("json", request),
  async (c) => {
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
  }
);
