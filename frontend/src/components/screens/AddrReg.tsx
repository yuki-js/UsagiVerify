import { honoApp } from "@usagiverify/backend";
import { hc } from "hono/client";
import Router from "next/router";
import React, { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Panel } from "../ui/Panel";
import { Screen } from "../ui/Screen";

/**
 * Prove Component
 * @returns
 */
const Prove: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // create hono client
  const client = hc<typeof honoApp>(
    "https://usagiverify.ouchiserver.aokiapp.com"
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  /**
   * Prove処理
   */
  const handleProve = async () => {
    setIsLoading(true);

    try {
      // Simulate API call or blockchain interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // call get access token api
      const response = await client["issue-at"].$post({
        json: {
          address: address,
        },
      });

      // accessTokenを取得する。
      const accessToken = (await response.json()).accessToken;

      console.log("accessToken:", accessToken);
      // ここでZKproof生成ロジックのAPIを呼びだす。
      const res = await client.prove.$post({
        json: {
          accessToken: accessToken,
        },
      });
      console.log("Prove response:", await res.json());

      // 成功したら次のステップに進む
      Router.push("/nfts");
    } catch (error) {
      console.error("Error during prove process:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Logic to navigate back
    console.log("Navigate back");
  };

  return (
    <Screen>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Panel>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-lg font-bold mr-2 text-gray-800">
                My Portal
              </h1>
              <span className="text-sm text-gray-800">
                EVM Address Registration
              </span>
            </div>
            <div>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg
                  className="w-6 h-6"
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Step 2. Register the EVM address
            </h2>
            <p className="mb-6 text-gray-800">
              Please add a wallet to connect with your account.
            </p>
          </div>

          <Card>
            <div className="flex flex-col items-center mb-6">
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  setIsLoading(false);
                  setAddress("0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072");
                }}
                className="w-64 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-md mb-5 shadow-lg shadow-blue-900/30 hover:brightness-110 transition-all"
              >
                Connect wallet
              </button>
            </div>

            <div className="w-full mb-6 max-w-lg mx-auto">
              <div className="bg-white/5 border border-white/20 rounded-md p-2">
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="0x"
                  className="w-full bg-white rounded-md p-3 text-black"
                />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button onClick={handleProve}>prove</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              How to register EVM address
            </h3>
            <ol className="space-y-5">
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  1
                </span>
                <div className="text-gray-800">
                  Connect your wallet using the button above
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  2
                </span>
                <div className="text-gray-800">
                  Or manually enter your EVM address starting with 0x
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  3
                </span>
                <div className="text-gray-800">
                  Click the prove button and sign the message in your wallet
                </div>
              </li>
            </ol>
          </Card>

          <div className="flex justify-center">
            <Button onClick={handleBack}>Back</Button>
          </div>
        </Panel>
      )}
    </Screen>
  );
};

export default Prove;
