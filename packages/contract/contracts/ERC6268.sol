// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.27;

import "./interface/IERC6268.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/**
 * @title ERC6268 Contract
 */
contract ERC6268 is IERC6268, ERC165, ERC1155 {
  using EnumerableSet for EnumerableSet.UintSet;

  // ロックされたトークンIDのセット
  EnumerableSet.UintSet private lockedTokens;

  /**
   * コンストラクター
   */
  constructor(string memory _uri) ERC1155(_uri) {}

  /**
   * 特定のトークンIDがロックされているかを確認
   */
  function locked(uint256 id) public view override returns (bool) {
    return lockedTokens.contains(id);
  }


  /**
   * 複数のトークンIDがすべてロックされているかを確認
   */
  function lockedBatch(
    uint256[] calldata ids
  ) public view override returns (bool) {
    for (uint256 i = 0; i < ids.length; i++) {
      if (!lockedTokens.contains(ids[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * トークンIDをロックする内部関数
   */
  function _lock(uint256 id) internal {
    require(lockedTokens.add(id), "Token is already locked");
    emit LockedSingle(id);
  }

  /**
   * 複数のトークンIDをロックする内部関数
   */
  function _lockBatch(uint256[] calldata ids) internal {
    for (uint256 i = 0; i < ids.length; i++) {
      if (lockedTokens.add(ids[i])) {
        emit LockedSingle(ids[i]);
      }
    }
    emit LockedBatch(ids);
  }

  /**
   * トークンIDのロックを解除する内部関数
   */
  function _unlock(uint256 id) internal {
    require(lockedTokens.remove(id), "Token is not locked");
    emit UnlockedSingle(id);
  }

  /**
   * 複数のトークンIDのロックを解除する内部関数
   */
  function _unlockBatch(uint256[] calldata ids) internal {
    for (uint256 i = 0; i < ids.length; i++) {
      if (lockedTokens.remove(ids[i])) {
        emit UnlockedSingle(ids[i]);
      }
    }
    emit UnlockedBatch(ids);
  }

  /**
   * supportsInterface
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165 , ERC1155) returns (bool) {
    return (interfaceId == type(IERC6268).interfaceId || super.supportsInterface(interfaceId));
  }
}
