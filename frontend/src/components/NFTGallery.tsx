import React, { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface NFT {
  id: number;
  name: string;
  type: string;
  tier?: number;
  description?: string;
}

/**
 * NFTGallery Component
 * @returns
 */
const NFTGallery: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalNft, setModalNft] = useState<NFT | null>(null);

  // Mock NFT data
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
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 relative z-10">
          {/* Browser-like UI frame */}
          <div className="w-full bg-white/5 rounded-lg mb-6 overflow-hidden border border-white/20">
            <div className="p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
                </div>
                <div className="text-gray-300 text-sm">0x000...000</div>
              </div>

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
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-2">
                        <div className="w-full h-full flex items-center justify-center bg-black/70 rounded">
                          <div className="text-yellow-400 font-bold text-lg">
                            {nft.type}
                          </div>
                        </div>
                      </div>
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

              <div className="flex justify-center mt-6">
                <div className="w-8 h-8 text-center">
                  <span role="img" aria-label="emoji" className="text-2xl">
                    💩
                  </span>
                </div>
              </div>
            </div>
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

      {/* NFT Detail Modal */}
      {showModal && modalNft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4 bg-gray-100 rounded-lg overflow-hidden shadow-xl">
            <div className="p-8 bg-gray-50 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-black rounded-md overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-4">
                    <div className="w-full h-full flex items-center justify-center bg-black/70 rounded-md">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center">
                          <div className="text-white transform -rotate-45">
                            ✓
                          </div>
                        </div>
                        <div className="absolute top-0 w-full h-full flex items-center justify-center">
                          <div className="w-10 h-5 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-t-full"></div>
                        </div>
                        <div className="absolute top-0 w-full h-full flex items-center justify-center">
                          <div className="w-10 h-5 bg-gradient-to-r from-lime-400 to-orange-400 rounded-t-full transform rotate-30"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/3 text-gray-800">
                <h2 className="text-xl font-bold mb-2">
                  医療費 Tier {modalNft.tier}
                </h2>
                <p className="mb-6 text-gray-600">{modalNft.description}</p>

                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  ボタン
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTGallery;
