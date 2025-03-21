import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("ERC1155WithLock", () => {
  /**
   * コントラクトをデプロイする関数
   * @returns
   */
  async function deployFixture() {
    const TOKEN_URI = "https://example.com";

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const nft = await hre.viem.deployContract("ERC1155WithLock", [TOKEN_URI]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      TOKEN_URI,
      nft,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", () => {
    it("Should set the right uri", async () => {
      const { nft, TOKEN_URI } = await loadFixture(deployFixture);
      // Token URIが一致しているか確認する。
      expect(await nft.read.uri([BigInt(0)])).to.equal(TOKEN_URI);
      expect(await nft.read.uri([BigInt(1)])).to.equal(TOKEN_URI);
    });

    it("Should set balance 0", async () => {
      const { nft, otherAccount, owner } = await loadFixture(deployFixture);
      // 残高が0であることを確認する。
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 0n])
      ).to.equal(0n);
      expect(
        await nft.read.balanceOf([
          otherAccount.account.address as `0x${string}`,
          0n,
        ])
      ).to.equal(0n);
    });
  });

  describe("ERC6268", () => {
    it("Should lock tokens", async () => {
      const { nft, owner, otherAccount } = await loadFixture(deployFixture);

      // mint
      await nft.write.mint([owner.account.address, 0n]);
      // 残高をチェック
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 0n])
      ).to.equal(1n);

      // トークンIDを指定して移転をロックする。
      await nft.write.lock([0n]);

      // 移転させようとしてエラーが発生することを確認する(ロックされていることを確認する)。
      await expect(
        // safeTransferFrom
        nft.write.safeTransferFrom([
          owner.account.address,
          otherAccount.account.address,
          0n,
          1n,
          "0x",
        ])
      ).to.be.rejectedWith("Token is locked and cannot be transferred");
    });

    it("Should unlock tokens", async () => {
      const { nft, owner, otherAccount } = await loadFixture(deployFixture);

      // mint
      await nft.write.mint([owner.account.address, 0n]);
      // 残高をチェック
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 0n])
      ).to.equal(1n);

      // トークンIDを指定して移転をロックする。
      await nft.write.lock([0n]);

      // 移転させようとしてエラーが発生することを確認する(ロックされていることを確認する)。
      await expect(
        // safeTransferFrom
        nft.write.safeTransferFrom([
          owner.account.address,
          otherAccount.account.address,
          0n,
          1n,
          "0x",
        ])
      ).to.be.rejectedWith("Token is locked and cannot be transferred");

      // トークンIDを指定して移転ロックを解除する。
      await nft.write.unlock([0n]);

      // 移転が成功することを確認する。
      await nft.write.safeTransferFrom([
        owner.account.address,
        otherAccount.account.address,
        0n,
        1n,
        "0x",
      ]);

      // 残高をチェック
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 0n])
      ).to.equal(0n);
      expect(
        await nft.read.balanceOf([
          otherAccount.account.address as `0x${string}`,
          0n,
        ])
      ).to.equal(1n);
    });

    // ロックされていないトークンIDは移転が成功することを確認する。
    it("Should transfer tokens", async () => {
      const { nft, owner, otherAccount } = await loadFixture(deployFixture);

      // mint (Token ID 0 & 1)
      await nft.write.mint([owner.account.address, 0n]);
      await nft.write.mint([owner.account.address, 1n]);

      // 残高をチェック
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 0n])
      ).to.equal(1n);
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 1n])
      ).to.equal(1n);

      // トークンIDを指定して移転をロックする。
      await nft.write.lock([0n]);

      // 移転させようとしてエラーが発生することを確認する(ロックされていることを確認する)。
      await expect(
        // safeTransferFrom
        nft.write.safeTransferFrom([
          owner.account.address,
          otherAccount.account.address,
          0n,
          1n,
          "0x",
        ])
      ).to.be.rejectedWith("Token is locked and cannot be transferred");

      // トークンID 1は成功することを確認する。
      await // safeTransferFrom
      nft.write.safeTransferFrom([
        owner.account.address,
        otherAccount.account.address,
        1n,
        1n,
        "0x",
      ]);

      // 残高をチェック
      expect(
        await nft.read.balanceOf([owner.account.address as `0x${string}`, 1n])
      ).to.equal(0n);
      expect(
        await nft.read.balanceOf([
          otherAccount.account.address as `0x${string}`,
          1n,
        ])
      ).to.equal(1n);
    });
  });
});
