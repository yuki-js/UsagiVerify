import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { getContractAddress } from "../../helpers/contractJsonHelper";

/**
 * 【Task】	mint NFT
 */
task("mint", "mint ERC1155 NFT")
  .addParam("to", "mint wallet address")
  .addParam("id", "token ID of NFT")
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "################################### [START] ###################################"
    );

    // get wallet client
    const [owner] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();
    // get chain ID
    const chainId = (await publicClient.getChainId()).toString();
    // get contract name
    const contractName = "ERC1155WithLockModule#ERC1155WithLock";
    // get contract address
    const contractAddress = getContractAddress(chainId, contractName);

    console.log(`
    ${contractName} 's address is ${contractAddress}
  `);

    // create Contract instance
    const nft = await hre.viem.getContractAt(
      "ERC1155WithLock",
      contractAddress as `0x${string}`,
      {
        client: { wallet: owner },
      }
    );

    // call mint method
    const hash = await nft.write.mint([taskArgs.to, BigInt(taskArgs.id)]);

    console.log(`
      tx Hash: ${hash}
    `);

    console.log(
      "################################### [END] ###################################"
    );
  });
