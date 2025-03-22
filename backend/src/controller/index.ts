import { Hono } from "hono";
import { cors } from "hono/cors";
import { root } from "./root";
import { healthz } from "./healthz";

const app = new Hono().route("/", root).route("/", healthz);

// CROS configuration
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

export default app;
