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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
      {/* 背景効果 */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-indigo-300 opacity-10 blur-xl"></div>

      <div className="w-full max-w-3xl border border-white/20 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm relative z-10 overflow-hidden">
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
            <button
              onClick={handleConnect}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium shadow-lg shadow-blue-900/30 transition-all hover:scale-105"
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
