import { Hono } from "hono";

export const healthz = new Hono().get("/healthz", (c) => {
  return c.json({
    status: "ok",
    message: "Service is healthy",
  });
});
