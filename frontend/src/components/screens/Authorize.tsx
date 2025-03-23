import React from "react";

import Router from "next/router";
import { ServiceConnectionInfo } from "../../util/types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Panel } from "../ui/Panel";
import { Screen } from "../ui/Screen";

const serviceInfo: ServiceConnectionInfo = {
  provider: "UsagiVerify株式会社",
  serviceDescription: "症状検索エンジン「Usagi」",
  dataAccess: [
    "保険医療機関・保険薬局等にて処方された薬剤の情報",
    "健診実施機関で受診した健診情報等",
    "保険医療機関・保険薬局等にて支払った医療費の情報",
  ],
};

/**
 * ServiceConnectionScreen Component
 * @returns
 */
const ServiceConnectionScreen: React.FC = () => {
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [verificationMethod, setVerificationMethod] = React.useState<
    "ic" | "qr"
  >("qr");

  /**
   * Handle QR verification method
   */
  const handleQrVerification = () => {
    if (agreeToTerms && verificationMethod === "qr") {
      Router.push("/qr-code");
    }
  };

  return (
    <Screen>
      <Panel>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold mr-2 text-gray-800">
              マイナポータル
            </h1>
            <span className="text-sm text-gray-600">外部サービスとの連携</span>
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            サービス連携
          </h2>
          <p className="mb-6 text-gray-700">
            マイナポータルと利用中のサービスを連携します。連携内容と規約へ確認同意のうえ、まずは本人確認を行ってください。
          </p>
        </div>

        <Card>
          <h3 className="text-xl font-bold mb-4 text-gray-800">連携内容</h3>
          <p className="mb-4 text-gray-700">
            {serviceInfo.provider}が提供する{serviceInfo.serviceDescription}
            で医療情報を記録するために、マイナポータルから以下の情報を取得します。
          </p>

          <ul className="space-y-5">
            {serviceInfo.dataAccess.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-gray-500">-</span>
                <div>
                  <div className="text-gray-800">{item}</div>
                  <button className="text-blue-500 text-sm flex items-center mt-2 hover:text-blue-400 transition-colors">
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
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4 text-gray-800">同意事項</h3>
          <a
            href="#"
            className="text-blue-500 flex items-center mb-4 hover:text-blue-400 transition-colors"
          >
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

          <div className="border border-gray-300 bg-gray-100 rounded-md p-4 mb-6">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 mr-3"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="text-gray-700">利用規約に同意する</span>
            </label>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            本人確認方法の選択
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`border ${
                verificationMethod === "ic"
                  ? "border-blue-400/50 bg-blue-100"
                  : "border-gray-300 bg-gray-100"
              } rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all hover:border-blue-400/30`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="verification"
                  className="mr-3"
                  checked={verificationMethod === "ic"}
                  onChange={() => setVerificationMethod("ic")}
                />
                <span className="text-gray-700">
                  ICカードリーダライタを使って本人確認
                </span>
              </div>
              <div className="text-blue-500">
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

            <label
              className={`border ${
                verificationMethod === "qr"
                  ? "border-blue-400/50 bg-blue-100"
                  : "border-gray-300 bg-gray-100"
              } rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all hover:border-blue-400/30`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="verification"
                  className="mr-3"
                  checked={verificationMethod === "qr"}
                  onChange={() => setVerificationMethod("qr")}
                />
                <span className="text-gray-700">
                  スマートフォンでQRコードを読み取って本人確認
                </span>
              </div>
              <div className="text-blue-500">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="5"
                    height="5"
                    x="3"
                    y="3"
                    rx="1"
                    strokeWidth="2"
                  />
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
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleQrVerification} disabled={!agreeToTerms}>
            次へ進む
          </Button>
        </div>
      </Panel>
    </Screen>
  );
};

export default ServiceConnectionScreen;
