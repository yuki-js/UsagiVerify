import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Panel } from "../ui/Panel";
import { Screen } from "../ui/Screen";

/**
 * QrCodeScreen component with authentication effect
 * @returns
 */
const QrCodeScreen: React.FC = () => {
  const [scanState, setScanState] = useState<
    "idle" | "scanning" | "authenticating" | "success"
  >("idle");
  const [progress, setProgress] = useState(0);

  const goToNextStep = async () => {
    Router.push("/addr-reg");
  };

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
        goToNextStep();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [scanState, progress]);

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
    Router.back();
  };

  /**
   * Simulate QR code scan
   */
  const handleSimulateScan = () => {
    setScanState("scanning");
  };

  return (
    <Screen>
      <Panel>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold mr-2  text-gray-800">
              マイナポータル
            </h1>
            <span className="text-sm text-gray-800">QRコード認証</span>
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
            マイナポータル認証するためにQRコードをスキャンしてください
          </h2>
          <p className="mb-6  text-gray-800">
            QRコードをスキャンすることで、マイナポータルアプリを使用して認証を行うことができます。
          </p>
        </div>

        <Card>
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
                <img
                  src="/sampleQRCode.png"
                  alt="QR code"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-64 h-64 border border-white/20 bg-white/5 rounded-md overflow-hidden flex flex-col items-center justify-center">
                {scanState === "scanning" && (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 border-4 border-blue-300 opacity-25 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <p className=" text-gray-800 font-medium">スキャン中...</p>
                  </div>
                )}

                {scanState === "authenticating" && (
                  <div className="text-center w-full px-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <svg
                        className="w-8 h-8  text-gray-800"
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
                    <p className=" text-gray-800 font-medium mb-2">
                      マイナンバーカード認証中...
                    </p>
                    <div className="w-full bg-blue-900/50 rounded-full h-2 mb-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs  text-gray-800">{progress}%</p>
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
                    <p className="text-sm  text-gray-800 mt-2">
                      遷移しています...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleRefreshQr}
              className={`px-6 py-2 rounded-full border border-blue-400/50  text-gray-800 hover:bg-blue-900/20 hover:border-blue-400 transition-all ${
                scanState !== "idle" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={scanState !== "idle"}
            >
              Refresh QR code
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            How to scan the QR code
          </h3>
          <ol className="space-y-5">
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                1
              </span>
              <div className="text-gray-800">Download the My Portal App</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                2
              </span>
              <div className="text-gray-800">
                Open the app and tap "Scan" at the bottom of the screen
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-400/30 flex items-center justify-center text-blue-300">
                3
              </span>
              <div className="flex flex-col">
                <div className="text-gray-800 mb-2">Scan the QR code</div>
              </div>
            </li>
          </ol>
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleBack} disabled={scanState !== "idle"}>
            Back
          </Button>
        </div>
      </Panel>
    </Screen>
  );
};

export default QrCodeScreen;
