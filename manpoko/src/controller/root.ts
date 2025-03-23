import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import { Hono } from "hono";

const tokenReq = Type.Object({
  sub: Type.String(),
});

export const root = new Hono().post("/", tbValidator("json", tokenReq), (c) => {
  const { sub } = c.req.valid("json");

  const accessToken = bakeAccessToken(sub);
  return c.json({ sub, accessToken });
});

function bakeAccessToken(sub: string) {
  const accessToken = {
    sub,
    kid: "access_token",
    iss: "manpoko",
  };
  const jsonAccessToken = JSON.stringify(accessToken);
  const base64AccessToken = Buffer.from(jsonAccessToken).toString("base64");

  return base64AccessToken;
}
