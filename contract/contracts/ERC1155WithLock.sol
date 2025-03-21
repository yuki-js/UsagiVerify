// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC6268.sol";

/**
 * @title ERC1155WithLock Contract
 */
contract ERC1155WithLock is ERC6268, Ownable {

  /**
   * コンストラクター
   */
  constructor(string memory _uri) ERC6268(_uri)Ownable(msg.sender) {}

  /**
   * トークンIDをロックする（オーナーのみ実行可能）
   */
  function lock(uint256 id) public onlyOwner {
    _lock(id);
  }

   /**
   * NFTをミントするメソッド
   */
  function mint(address _to, uint256 _id) public {
    _mint(_to, _id, 1, "");
  }

  /**
   * 複数のトークンIDをロックする（オーナーのみ実行可能）
   */
  function lockBatch(uint256[] calldata ids) public onlyOwner {
    _lockBatch(ids);
  }

  /**
   * トークンIDのロックを解除する（オーナーのみ実行可能）
   */
  function unlock(uint256 id) public onlyOwner {
    _unlock(id);
  }

  /**
   * 複数のトークンIDのロックを解除する（オーナーのみ実行可能）
   */
  function unlockBatch(uint256[] calldata ids) public onlyOwner {
    _unlockBatch(ids);
  }

  /**
   * トークンの安全な転送（ロックされている場合は転送を拒否）
   */
  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public virtual override {
    require(!locked(id), "Token is locked and cannot be transferred");
    super.safeTransferFrom(from, to, id, amount, data);
  }

  /**
   * 複数トークンの安全な転送（ロックされているトークンが含まれている場合は転送を拒否）
   */
  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public virtual override {
    for (uint256 i = 0; i < ids.length; i++) {
     require(
        !locked(ids[i]),
        "One or more tokens are locked and cannot be transferred"
      );
    }
    super.safeBatchTransferFrom(from, to, ids, amounts, data);
  }
}
