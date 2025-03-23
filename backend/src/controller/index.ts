import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthz } from "./healthz";
import { root } from "./root";

const app = new Hono()
  .use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 600,
    })
  )
  .route("/", root)
  .route("/", healthz);

export default app;
