"use client";

import ConnectInitialScreen from "@/components/ConnectInitialScreen";
import QrCodeScreen from "@/components/QrCodeScreen";
import ServiceConnectionScreen from "@/components/ServiceConnectionScreen";
import { connectionStepAtom } from "@/lib/atoms";
import { honoApp } from "@usagiverify/backend";
import { hc } from "hono/client";
import { useAtom } from "jotai";
import { useEffect } from "react";

/**
 * Home component
 * @returns
 */
export default function Page() {
  const [connectionStep] = useAtom(connectionStepAtom);

  useEffect(() => {
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
  }, []);

  return (
    <main>
      {connectionStep === 1 && <ConnectInitialScreen />}
      {connectionStep === 2 && <ServiceConnectionScreen />}
      {connectionStep === 3 && <QrCodeScreen />}
    </main>
  );
}
