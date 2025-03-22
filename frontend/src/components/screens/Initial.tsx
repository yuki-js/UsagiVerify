import { useAtom } from "jotai";
import Router from "next/router";
import React from "react";
import { Screen } from "../ui/Screen";
import { Panel } from "../ui/Panel";
import { Button } from "../ui/Button";

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
          <p className="text-center mb-6 text-gray-200">Mynaportal is ...</p>

          <div className="bg-black/80 w-full aspect-video relative flex items-center justify-center mb-10 rounded-lg border border-gray-700">
            <div className="absolute left-4">
              <button className="text-white p-2 rounded-full bg-gray-800/70 hover:bg-blue-600/70 transition-colors">
                <span className="text-2xl">&lt;</span>
              </button>
            </div>

            <div className="text-center">
              <div className="bg-yellow-50/90 p-6 w-64 mx-auto backdrop-blur-sm rounded-md">
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                  説明力ルーセル
                </h3>
                <div className="text-sm text-gray-700">青木ゆうき</div>
              </div>
            </div>

            <div className="absolute right-4">
              <button className="text-white p-2 rounded-full bg-gray-800/70 hover:bg-blue-600/70 transition-colors">
                <span className="text-2xl">&gt;</span>
              </button>
            </div>

            <div className="absolute bottom-2 w-full flex justify-center space-x-2">
              <div className="w-6 h-1 bg-white/80 rounded-full"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleConnect}>Connect to Mynaportal</Button>
          </div>
        </div>
      </Panel>
    </Screen>
  );
};

export default ConnectInitialScreen;
