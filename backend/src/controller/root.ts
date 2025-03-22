import { tbValidator } from "@hono/typebox-validator";
import { TSchema, Type } from "@sinclair/typebox";
import { Hono } from "hono";

const request = Type.Object({
  name: Type.String(),
  age: Type.Number(),
});

export const root = new Hono()
  .post("/", tbValidator("json", request), (c) => {
    return c.json({
      message: "Hello World",
      data: c.req.valid("json"),
    });
  })
  .get("/", (c) => {
    return c.json({
      message: "Hello World",
    });
  });
