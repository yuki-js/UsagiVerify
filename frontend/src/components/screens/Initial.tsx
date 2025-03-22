import { useAtom } from "jotai";
import Router from "next/router";
import React from "react";
import { Screen } from "../ui/Screen";
import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";
import { Carousel } from "../ui/Carousel";

/**
 * ConnectInitialScreen component
 * @returns
 */
const ConnectInitialScreen: React.FC = () => {
  /**
   * Handle connect button click method
   */
  const handleConnect = () => {
    Router.push("/authorize");
  };

  return (
    <Screen>
      <Panel>
        <div className="py-12 px-4">
          <h1 className="text-xl font-medium text-center mb-6">
            Step 1. Connect to Mynaportal
          </h1>
          <p className="text-center mb-6 text-gray-700">Mynaportal is ...</p>

          <Carousel>
            <div></div>
            <div></div>
          </Carousel>

          <div className="flex justify-center">
            <Button onClick={handleConnect}>Connect to Mynaportal</Button>
          </div>
        </div>
      </Panel>
    </Screen>
  );
};

export default ConnectInitialScreen;
