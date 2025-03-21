import { serve } from "@hono/node-server";
import app from "./controller";

export const honoApp = app;

function main() {
  serve(app);
}

main();
