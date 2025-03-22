"use client";

import ConnectInitialScreen from "@/components/screens/Initial";
import { honoApp } from "@usagiverify/backend";
import { hc } from "hono/client";
import { useEffect } from "react";

/**
 * Home component - Initial connection screen
 */
export default function Page() {
  useEffect(() => {
    // Initialize API client
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main>
      <ConnectInitialScreen />
    </main>
  );
}
