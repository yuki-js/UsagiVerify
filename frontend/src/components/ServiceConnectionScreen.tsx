import { useAtom } from "jotai";
import React from "react";
import { connectionStepAtom } from "../atoms";
import { ServiceConnectionInfo } from "../types";

/**
 * ServiceConnectionScreen Component
 * @returns
 */
const ServiceConnectionScreen: React.FC = () => {
  const [_, setConnectionStep] = useAtom(connectionStepAtom);
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [verificationMethod, setVerificationMethod] = React.useState<
    "ic" | "qr"
  >("qr");

  const serviceInfo: ServiceConnectionInfo = {
    provider: "Ubie株式会社",
    serviceDescription: "症状検索エンジン「ユビー」",
    dataAccess: [
      "保険医療機関・保険薬局等にて処方された薬剤の情報",
      "健診実施機関で受診した健診情報等",
      "保険医療機関・保険薬局等にて支払った医療費の情報",
    ],
  };

  /**
   * Handle QR verification method
   */
  const handleQrVerification = () => {
    if (agreeToTerms && verificationMethod === "qr") {
      setConnectionStep(3);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold mr-2">マイナポータル</h1>
          <span className="text-sm text-gray-500">外部サービスとの連携</span>
        </div>
        <div>
          <button className="p-2">
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
        <h2 className="text-2xl font-bold mb-4">サービス連携</h2>
        <p className="mb-6">
          マイナポータルと利用中のサービスを連携します。連携内容と規約へ確認同意のうえ、まずは本人確認を行ってください。
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">連携内容</h3>
        <p className="mb-4">
          {serviceInfo.provider}が提供する{serviceInfo.serviceDescription}
          で医療情報を記録するために、マイナポータルから以下の情報を取得します。
        </p>

        <ul className="space-y-4">
          {serviceInfo.dataAccess.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">-</span>
              <div>
                <div>{item}</div>
                <button className="text-blue-600 text-sm flex items-center mt-1">
                  詳細の項目
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
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">同意事項</h3>
        <a href="#" className="text-blue-600 flex items-center mb-4">
          マイナポータルの利用規約
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

        <div className="border rounded-md p-4 mb-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              className="mt-1 mr-2"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <span>利用規約に同意する</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">本人確認方法の選択</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="border rounded-md p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <input
                type="radio"
                name="verification"
                className="mr-3"
                checked={verificationMethod === "ic"}
                onChange={() => setVerificationMethod("ic")}
              />
              <span>ICカードリーダライタを使って本人確認</span>
            </div>
            <div>
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="18"
                  height="14"
                  x="3"
                  y="5"
                  rx="2"
                  strokeWidth="2"
                />
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M7 15v-2M12 15v-6M17 15v-4"
                />
              </svg>
            </div>
          </label>

          <label className="border rounded-md p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <input
                type="radio"
                name="verification"
                className="mr-3"
                checked={verificationMethod === "qr"}
                onChange={() => setVerificationMethod("qr")}
              />
              <span>スマートフォンでQRコードを読み取って本人確認</span>
            </div>
            <div>
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="5" height="5" x="3" y="3" rx="1" strokeWidth="2" />
                <rect
                  width="5"
                  height="5"
                  x="16"
                  y="3"
                  rx="1"
                  strokeWidth="2"
                />
                <rect
                  width="5"
                  height="5"
                  x="3"
                  y="16"
                  rx="1"
                  strokeWidth="2"
                />
                <rect
                  width="7"
                  height="7"
                  x="14"
                  y="14"
                  rx="1"
                  strokeWidth="2"
                />
                <path strokeWidth="2" d="M8 4h3M4 8v3M17 8v3M8 17h3" />
              </svg>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleQrVerification}
          className={`px-6 py-3 ${
            agreeToTerms
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          } rounded-md font-medium`}
          disabled={!agreeToTerms}
        >
          次へ進む
        </button>
      </div>
    </div>
  );
};

export default ServiceConnectionScreen;
