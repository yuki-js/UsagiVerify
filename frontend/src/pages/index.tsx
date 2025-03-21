"use client";

import { honoApp } from "@usagiverify/backend";
import { hc } from "hono/client";

/**
 * Home component
 * @returns
 */
export default function Page() {
  const client = hc<typeof honoApp>("http://localhost:3000");
  client.index
    .$get({
      json: {
        name: "John Doe",
        age: 30,
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.status);
      console.log(res.body);
      console.log(res.headers);
    });

  return <h1>Hello, Next.js!</h1>;
}
