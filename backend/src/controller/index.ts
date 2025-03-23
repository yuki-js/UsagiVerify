import { Hono } from "hono";
import { cors } from "hono/cors";
import { healthz } from "./healthz";
import { root } from "./root";

const app = new Hono().route("/", root).route("/", healthz);

// CROS configuration
app.use("*", cors());

export default app;

export type AppType = typeof app;
