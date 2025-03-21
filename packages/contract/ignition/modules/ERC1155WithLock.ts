// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * デプロイ用のスクリプト
 */
const ERC1155WithLockModule = buildModule("ERC1155WithLockModule", (m) => {
  const uri = m.getParameter("uri", "https://example.com");

  const nft = m.contract("ERC1155WithLock", [uri]);

  return { nft };
});

export default ERC1155WithLockModule;
