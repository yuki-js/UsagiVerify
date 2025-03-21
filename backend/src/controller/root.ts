import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import { Hono } from "hono";

const request = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

export const root = new Hono().get("/", tbValidator("json", request), (c) => {
  return c.text("Hello Hono!");
});
