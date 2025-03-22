import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { connectionStepAtom } from "../lib/atoms";

/**
 * QrCodeScreen component with authentication effect
 * @returns
 */
const QrCodeScreen: React.FC = () => {
  const [_, setConnectionStep] = useAtom(connectionStepAtom);
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "authenticating" | "success"
  >("idle");
  const [progress, setProgress] = useState(0);

  // Effect for auto transition after some seconds
  useEffect(() => {
    if (scanState === "idle") return;

    let timer: NodeJS.Timeout;

    if (scanState === "scanning") {
      // Scanning effect lasts 2 seconds
      timer = setTimeout(() => {
        setScanState("authenticating");
        setProgress(0);
      }, 2000);
    } else if (scanState === "authenticating") {
      // Authentication effect with progress bar
      if (progress < 100) {
        timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + 10, 100));
        }, 300);
      } else {
        timer = setTimeout(() => {
          setScanState("success");
        }, 500);
      }
    } else if (scanState === "success") {
      // After success, wait 1 second before navigation
      timer = setTimeout(() => {
        setConnectionStep(4);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [scanState, progress, setConnectionStep]);

  /**
   * Handle refresh QR code method
   */
  const handleRefreshQr = () => {
    setScanState("idle");
    setProgress(0);
    alert("QR code refreshed");
  };

  /**
   * Handle back button click method
   */
  const handleBack = () => {
    // ステータスをリセットして前の画面に戻る
    setConnectionStep(2);
  };

  /**
   * Simulate QR code scan
   */
  const handleSimulateScan = () => {
    setScanState("scanning");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 text-white p-4">
      {/* Background effects */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-indigo-300 opacity-10 blur-xl"></div>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold mr-2">My Portal</h1>
            <span className="text-sm text-gray-300">
              QR Code Authentication
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
            Scan QR code with My Portal App
          </h2>
          <p className="mb-6 text-gray-200">
            Complete your identity verification by scanning this QR code with
            the My Portal App on your smartphone.
          </p>
        </div>

        <div className="mb-8 bg-white/5 p-5 rounded-lg border border-white/10">
          <a
            href="#"
            className="text-blue-300 flex items-center mb-6 hover:text-blue-200 transition-colors"
          >
            Download the app
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          <div className="w-full flex justify-center mb-6 relative">
            {scanState === "idle" ? (
              <div
                className="w-64 h-64 border border-white/20 bg-white/5 rounded-md overflow-hidden cursor-pointer"
                onClick={handleSimulateScan}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M0,0 h40 v40 h-40 z M60,0 h40 v40 h-40 z M0,60 h40 v40 h-40 z"
                    fill="#1e3a8a"
                    stroke="#93c5fd"
                    strokeWidth="4"
                  />
                  <rect
                    x="65"
                    y="65"
                    width="30"
                    height="30"
                    fill="#1e3a8a"
                    stroke="#93c5fd"
                    strokeWidth="4"
                  />
                  <path
                    d="M5,5 h30 v30 h-30 z M65,5 h30 v30 h-30 z M5,65 h30 v30 h-30 z"
                    fill="#3b82f6"
                  />
                  <path
                    d="M15,15 h10 v10 h-10 z M75,15 h10 v10 h-10 z M15,75 h10 v10 h-10 z"
                    fill="#1e3a8a"
                  />
                  <path
                    d="M40,10 h10 M10,50 h10 M50,70 h10 M70,50 h10"
                    stroke="#93c5fd"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-64 h-64 border border-white/20 bg-white/5 rounded-md overflow-hidden flex flex-col items-center justify-center">
                {scanState === "scanning" && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 border-4 border-blue-300 opacity-25 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-blue-200 font-medium">Scanning...</p>
                  </div>
                )}

                {scanState === "authenticating" && (
                  <div className="text-center w-full px-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <svg
                        className="w-8 h-8 text-blue-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="16"
                          rx="2"
                          strokeWidth="2"
                        />
                        <path
                          d="M7 8h10M7 12h6"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <svg
                        className="w-6 h-6 text-blue-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M13 17l5-5-5-5M6 17l5-5-5-5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        className="w-8 h-8 text-blue-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M9 12a3 3 0 106 0 3 3 0 00-6 0z"
                          strokeWidth="2"
                        />
                        <path
                          d="M20.188 10.9c.7-.7 1.84-.7 2.524 0 1.4 1.4 1.4 3.675 0 5.075-1.4 1.4-3.675 1.4-5.074 0L20.189 10.9zM3.813 10.9c-.7-.7-1.84-.7-2.524 0-1.4 1.4-1.4 3.675 0 5.075 1.4 1.4 3.675 1.4 5.074 0L3.812 10.9z"
                          strokeWidth="2"
                        />
                        <path
                          d="M16.954 7.046a3.75 3.75 0 00-5.303 0L8.35 3.651a7.5 7.5 0 0110.607 0l-2.002 3.394z"
                          strokeWidth="2"
                        />
                        <path
                          d="M7.046 16.954a3.75 3.75 0 000-5.303L3.651 8.35a7.5 7.5 0 000 10.607l3.395-2.002z"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <p className="text-blue-200 font-medium mb-2">
                      マイナンバーカード認証中...
                    </p>
                    <div className="w-full bg-blue-900/50 rounded-full h-2 mb-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-300">{progress}%</p>
                  </div>
                )}

                {scanState === "success" && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-green-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-green-300 font-medium">認証成功!</p>
                    <p className="text-sm text-blue-200 mt-2">
                      遷移しています...
                    </p>
                  </div>
                )}
              </div>
            )}

            {scanState === "idle" && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full">
                クリックしてスキャンをシミュレート
              </div>
            )}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleRefreshQr}
              className={`px-6 py-2 rounded-full border border-blue-400/50 text-blue-300 hover:bg-blue-900/20 hover:border-blue-400 transition-all ${
                scanState !== "idle" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={scanState !== "idle"}
            >
              Refresh QR code
            </button>
          </div>
        </div>

        <div className="mb-8 bg-white/5 p-5 rounded-lg border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-blue-100">
            How to scan the QR code
          </h3>
          <ol className="space-y-5">
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                1
              </span>
              <div className="text-gray-200">Download the My Portal App</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                2
              </span>
              <div className="text-gray-200">
                Open the app and tap "Scan" at the bottom of the screen
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                3
              </span>
              <div className="flex flex-col">
                <div className="text-gray-200 mb-2">Scan the QR code</div>
                <div className="bg-white/5 p-3 border border-white/20 rounded-md shadow-sm">
                  <div className="text-xs text-gray-400 mb-2">
                    Please agree to the privacy policy
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 flex items-center justify-center text-gray-300">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 12h18M3 6h18M3 18h18"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          strokeWidth="2"
                        />
                        <path d="M8 8h8v8h-8z" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center text-gray-300">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M4 6h16M4 12h16M4 18h16"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleBack}
            className={`px-8 py-3 rounded-full font-medium bg-white/5 hover:bg-white/10 border border-white/20 text-gray-200 transition-all ${
              scanState !== "idle" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={scanState !== "idle"}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScreen;
