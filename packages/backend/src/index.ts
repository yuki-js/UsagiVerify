import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { schema } from "./schema";
import { tbValidator } from "@hono/typebox-validator";
import { describeRoute } from "hono-openapi";

const app = new Hono();

app.get(
  "/",
  describeRoute({
    description: "Hello Hono!",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: schema,
          },
        },
      },
    },
  }),
  tbValidator("json", schema),
  (c) => {
    return c.text("Hello Hono!");
  }
);

export default app;

serve(app);
