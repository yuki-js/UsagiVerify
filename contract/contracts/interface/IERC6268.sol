// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.27;

interface IERC6268 {
  event LockedSingle(uint256 indexed id);
  event LockedBatch(uint256[] ids);
  event UnlockedSingle(uint256 indexed id);
  event UnlockedBatch(uint256[] ids);

  function locked(uint256 id) external view returns (bool);

  function lockedBatch(uint256[] calldata ids) external view returns (bool);
}
