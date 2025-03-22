import { serve } from "@hono/node-server";
import app from "./controller";
import config from "./config";

export const honoApp = app;

function main() {
  serve(
    {
      fetch: app.fetch,
      port: process.env.PORT ? parseInt(process.env.PORT) : config.PORT,
    },
    (info) => {
      console.log(
        `Server started on ${info.family}/${info.address}:${info.port}`
      );
    }
  );
}

main();
