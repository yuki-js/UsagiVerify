import React, { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import Router from "next/router";

/**
 * Prove Component
 * @returns
 */
const Prove: React.FC = () => {
  const [address, setAddress] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      // ここでZKproof生成ロジックのAPIを呼びだす。

      // 成功したら次のステップに進む
      Router.push("/wait-for-proof");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-4">
      {/* Background effects */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-indigo-300 opacity-10 blur-xl"></div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-lg font-bold mr-2">My Portal</h1>
              <span className="text-sm text-gray-300">
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
            <h2 className="text-2xl font-bold mb-4 text-blue-100">
              Step 2. Register the EVM address
            </h2>
            <p className="mb-6 text-gray-200">
              Please add a wallet to connect with your account.
            </p>
          </div>

          <div className="mb-8 bg-white/5 p-5 rounded-lg border border-white/10">
            <div className="flex flex-col items-center mb-6">
              <button className="w-64 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-md mb-5 shadow-lg shadow-blue-900/30 hover:brightness-110 transition-all">
                Connect wallet
              </button>
              <p className="text-blue-200">Or type your address</p>
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
              <button
                onClick={handleProve}
                className="px-10 py-2 rounded-md font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30 hover:brightness-110 transition-all"
              >
                prove
              </button>
            </div>
          </div>

          <div className="mb-8 bg-white/5 p-5 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-blue-100">
              How to register EVM address
            </h3>
            <ol className="space-y-5">
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  1
                </span>
                <div className="text-gray-200">
                  Connect your wallet using the button above
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  2
                </span>
                <div className="text-gray-200">
                  Or manually enter your EVM address starting with 0x
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  3
                </span>
                <div className="text-gray-200">
                  Click the prove button and sign the message in your wallet
                </div>
              </li>
            </ol>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="px-8 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/20 text-gray-200 transition-all"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prove;
