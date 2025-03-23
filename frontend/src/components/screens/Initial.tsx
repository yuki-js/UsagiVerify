import Router from "next/router";
import React from "react";
import { Button } from "../ui/Button";
import { Carousel } from "../ui/Carousel";
import { Panel } from "../ui/Panel";
import { Screen } from "../ui/Screen";

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold mr-2 text-gray-800">
              Connect to Mynaportal
            </h1>
          </div>
          <div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg
                className="w-6 h-6 text-blue-950"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Step 1</h2>
          <p className="mb-6 text-gray-700">
            Connect to Mynaportal to get your personal data.
          </p>
        </div>

        <Carousel>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 ml-4">
              Usagi Verify
            </h2>
            <p className="mb-10 text-gray-700 ml-4">
              Usagi Verify is a product that utilizes Zero-Knowledge Proofs (ZK)
              to enable the verification and utilization of real-world public
              information (such as My Number in Japan) on the blockchain while
              maintaining confidentiality.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 ml-4">
              Usagi Verify
            </h2>
            <p className="mb-10 text-gray-700 ml-4">
              Usagi Verify is a product that utilizes Zero-Knowledge Proofs (ZK)
              to enable the verification and utilization of real-world public
              information (such as My Number in Japan) on the blockchain while
              maintaining confidentiality.
            </p>
          </div>
        </Carousel>

        <div className="flex justify-center">
          <Button onClick={handleConnect}>Connect to Mynaportal</Button>
        </div>
      </Panel>
    </Screen>
  );
};

export default ConnectInitialScreen;
