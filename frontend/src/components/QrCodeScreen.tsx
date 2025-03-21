import { useAtom } from "jotai";
import React from "react";
import { connectionStepAtom } from "../atoms";

/**
 * QrCodeScreen component
 * @returns
 */
const QrCodeScreen: React.FC = () => {
  const [_, setConnectionStep] = useAtom(connectionStepAtom);

  /**
   * Handle refresh QR code method
   */
  const handleRefreshQr = () => {
    // Logic to refresh QR code would go here
    alert("QR code refreshed");
  };

  /**
   * Handle back button click method
   */
  const handleBack = () => {
    setConnectionStep(2);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          マイナポータルアプリでQRコードを読み取る
        </h2>
        <a href="#" className="text-blue-600 flex items-center mb-4">
          アプリをダウンロード
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>

        <div className="w-full flex justify-center mb-6">
          <div className="w-64 h-64 border border-gray-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 h40 v40 h-40 z M60,0 h40 v40 h-40 z M0,60 h40 v40 h-40 z"
                fill="white"
                stroke="black"
                strokeWidth="4"
              />
              <rect
                x="65"
                y="65"
                width="30"
                height="30"
                fill="white"
                stroke="black"
                strokeWidth="4"
              />
              <path
                d="M5,5 h30 v30 h-30 z M65,5 h30 v30 h-30 z M5,65 h30 v30 h-30 z"
                fill="black"
              />
              <path
                d="M15,15 h10 v10 h-10 z M75,15 h10 v10 h-10 z M15,75 h10 v10 h-10 z"
                fill="white"
              />
              <path
                d="M40,10 h10 M10,50 h10 M50,70 h10 M70,50 h10"
                stroke="black"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleRefreshQr}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md"
          >
            QRコードを更新
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">QRコードの読み取り方</h3>
          <ol className="space-y-4">
            <li className="flex">
              <span className="mr-2">1.</span>
              <span>マイナポータルアプリをダウンロード</span>
            </li>
            <li className="flex">
              <span className="mr-2">2.</span>
              <span>アプリを開き、画面下部の"読取り"を押す</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <div className="flex flex-col">
                <span className="mb-2">QRコードを読み取る</span>
                <div className="bg-white p-2 border rounded-md shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">
                    プライバシーポリシーに同意してください
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 flex items-center justify-center">
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
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
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
                    <div className="w-8 h-8 flex items-center justify-center">
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
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScreen;
