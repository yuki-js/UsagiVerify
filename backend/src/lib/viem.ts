import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import config from "../config";
import { ERC1155WithLock_ABI } from "./../util/abi/ERC1155WithLock";

const chain = sepolia;
const ERC1155WithLock_ADDRESS = config.ERC1155WithLock_ADDRESS as `0x${string}`;
// sepolia END Point
const SEPOLIA_END_POINT = "https://eth-sepolia.g.alchemy.com/v2/rfMVv9B9tS5QgGVcVn83K0lC-aG8ZEVdoKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// 公開クライアント
const publicClient = createPublicClient({
  chain,
  transport: http(SEPOLIA_END_POINT),
});

// ウォレットクライアント
const walletClient = createWalletClient({
  chain,
  transport: http(SEPOLIA_END_POINT),
  account: privateKeyToAccount(config.PRIVATE_KEY as `0x${string}`),
});

// Create Contract instance
const contract = getContract({
  address: ERC1155WithLock_ADDRESS,
  abi: ERC1155WithLock_ABI,
  client: publicClient,
});

/**
 * get token balance
 * @param account
 * @param tokenId
 * @returns
 */
export const getBalance = async (account: string, tokenId: bigint) => {
  return Number(await contract.read.balanceOf([account, tokenId]));
};

/**
 * check if token is locked
 * @param tokenId
 * @returns
 */
export const isTokenLocked = async (tokenId: bigint) => {
  return await contract.read.locked([tokenId]);
};

/**
 * get token URI method
 * @param tokenId
 * @returns
 */
export const getTokenURI = async (tokenId: bigint) => {
  return await contract.read.uri([tokenId]);
};

/**
 * lock token method
 * @param tokenId
 */
export const lockToken = async (tokenId: bigint) => {
  try {
    const txHash = await walletClient.writeContract({
      address: ERC1155WithLock_ADDRESS,
      abi: ERC1155WithLock_ABI,
      functionName: "lock",
      args: [tokenId],
    });

    // wait for tx to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    console.log("lockToken tx receipt:", receipt);
  } catch (error) {
    console.log("error occured when lockToken:", error);
  }
};

/**
 * token unlock method
 * @param tokenId
 */
export const unlockToken = async (tokenId: bigint) => {
  try {
    const txHash = await walletClient.writeContract({
      address: ERC1155WithLock_ADDRESS,
      abi: ERC1155WithLock_ABI,
      functionName: "unlock",
      args: [tokenId],
    });

    // wait for tx to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    console.log("unlockToken tx receipt:", receipt);
  } catch (error) {
    console.log("error occured when unlockToken:", error);
  }
};

/**
 * mint NFT method
 * @param to
 * @param tokenId
 * @param amount
 * @param uri
 */
export const mintToken = async (
  to: string,
  tokenId: bigint,
  amount: bigint,
  uri: string
) => {
  try {
    const txHash = await walletClient.writeContract({
      address: ERC1155WithLock_ADDRESS,
      abi: ERC1155WithLock_ABI,
      functionName: "mint",
      args: [to, tokenId, amount, uri],
    });

    // wait for tx to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    console.log("mintToken tx receipt:", receipt);
  } catch (error) {
    console.log("error occured when mint:", error);
  }
};

/**
 * simple transfer token method
 * @param from
 * @param to
 * @param tokenId
 * @param amount
 * @returns
 */
export const transferToken = async (
  from: string,
  to: string,
  tokenId: bigint,
  amount: bigint
) => {
  try {
    const txHash = await walletClient.writeContract({
      address: ERC1155WithLock_ADDRESS,
      abi: ERC1155WithLock_ABI,
      functionName: "safeTransferFrom",
      args: [from, to, tokenId, amount, "0x"],
    });
    // wait for tx to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    console.log("safeTransferFrom tx receipt:", receipt);
  } catch (error) {
    console.log("error occured when safeTransferFrom:", error);
  }
};

/**
 * batch transfer token method
 * @param from
 * @param to
 * @param tokenIds
 * @param amounts
 * @returns
 */
export const transferBatchToken = async (
  from: string,
  to: string,
  tokenIds: bigint[],
  amounts: bigint[]
) => {
  try {
    const txHash = await walletClient.writeContract({
      address: ERC1155WithLock_ADDRESS,
      abi: ERC1155WithLock_ABI,
      functionName: "safeBatchTransferFrom",
      args: [from, to, tokenIds, amounts, "0x"],
    });

    // wait for tx to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

    console.log("safeBatchTransferFrom tx receipt:", receipt);
  } catch (error) {
    console.log("error occured when safeBatchTransferFrom:", error);
  }
};
