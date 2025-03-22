import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Panel } from "../ui/Panel";
import { Screen } from "../ui/Screen";

interface NFT {
  id: number;
  name: string;
  type: string;
  tier?: number;
  description?: string;
}

/**
 * ConnectInitialScreen component
 * @returns
 */
const NFTCards: React.FC = () => {
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalNft, setModalNft] = useState<NFT | null>(null);

  // mock NFT data
  const nfts = Array(20)
    .fill(null)
    .map((_, i) => ({
      id: i,
      name: `SSR NFT #${i + 1}`,
      type: "SSR",
      tier: 5,
      description: "あなたは指定難病医療制度の対象です。",
    }));

  /**
   * NFTをクリックした時の挙動(モーダルを開く)
   * @param id
   */
  const handleNftClick = (id: number) => {
    setSelectedNft(id);
    const nft = nfts.find((nft) => nft.id === id);
    if (nft) {
      setModalNft(nft);
      setShowModal(true);
    }
  };

  /**
   * モーダルを閉じるメソッド
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Screen>
      <Panel>
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden mb-2">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
          </div>
          <div className="text-gray-800 text-sm">0x000...000</div>
          <h1 className="text-gray-800 text-lg font-bold mr-2">Your NFT</h1>
        </div>
        <Card>
          <div className="grid grid-cols-5 gap-4">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className={`relative cursor-pointer transition-transform hover:scale-105 ${
                  selectedNft === nft.id ? "ring-2 ring-yellow-400" : ""
                }`}
                onClick={() => handleNftClick(nft.id)}
              >
                <div className="w-full aspect-square bg-black rounded-md overflow-hidden">
                  <img src="logo.png" />
                </div>

                {nft.id === 19 && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-200 transform rotate-45">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </Panel>
      {/* NFT Detail Modal */}
      {showModal && modalNft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4 bg-gray-100 rounded-lg overflow-hidden shadow-xl">
            <div className="p-8 bg-gray-50 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-black rounded-md overflow-hidden">
                  <img src="logo.png" />
                </div>
              </div>

              <div className="w-full md:w-2/3 text-gray-800">
                <h2 className="text-xl font-bold mb-2">
                  医療費 Tier {modalNft.tier}
                </h2>
                <p className="mb-6 text-gray-800">{modalNft.description}</p>
                <Button onClick={handleCloseModal}>ボタン</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
};

export default NFTCards;
