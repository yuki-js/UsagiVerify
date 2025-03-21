import { useAtom } from "jotai";
import React from "react";
import { connectionStepAtom } from "../atoms";

/**
 * ConnectInitialScreen component
 * @returns
 */
const ConnectInitialScreen: React.FC = () => {
  const [_, setConnectionStep] = useAtom(connectionStepAtom);

  /**
   * Handle connect button click method
   */
  const handleConnect = () => {
    setConnectionStep(2);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl border rounded-lg shadow-sm">
        <div className="py-12 px-4">
          <h1 className="text-xl font-medium text-center mb-6">
            Step 1. Connect to Mynaportal
          </h1>
          <p className="text-center mb-6">Mynaportal is ...</p>

          <div className="bg-black w-full aspect-video relative flex items-center justify-center mb-10">
            <div className="absolute left-4">
              <button className="text-white p-2 rounded-full bg-gray-800">
                <span className="text-2xl">&lt;</span>
              </button>
            </div>

            <div className="text-center">
              <div className="bg-yellow-50 p-6 w-64 mx-auto">
                <h3 className="text-lg font-medium mb-4">説明力ルーセル</h3>
                <div className="text-sm">青木ゆうき</div>
              </div>
            </div>

            <div className="absolute right-4">
              <button className="text-white p-2 rounded-full bg-gray-800">
                <span className="text-2xl">&gt;</span>
              </button>
            </div>

            <div className="absolute bottom-2 w-full flex justify-center">
              <div className="w-6 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleConnect}
              className="px-6 py-3 bg-black text-white rounded-md font-medium"
            >
              Connect to Mynaportal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectInitialScreen;
