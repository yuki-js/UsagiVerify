# ERC6268-Sample

ERC6268 調査用のリポジトリ

## 動かし方

- セットアップ

  `.env`を作成して環境変数を貼り付けること

  ```bash
  cp .env.example .env
  ```

  ```txt
  PRIVATE_KEY=""
  ARBITRUM_ETHERSCAN_KEY=""
  BASESCAN_API_KEY=""
  ```

- フォーマッター適用

  ```bash
  bun run format
  ```

- インストール

  ```bash
  bun install
  ```

- コンパイル

  ```bash
  bun run compile
  ```

- テスト

  ```bash
  bun run test
  ```

- ERC1155WithLock コントラクトをデプロイする

  ```bash
  npm run deploy:ERC1155WithLockModule --network baseSepolia
  ```

- verify

  ```bash
  npm run verify chain-11155111
  ```

- NFT をミント

  ```bash
  npx hardhat mint --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --id 0 --amount 1 --uri https://chocolate-nice-gazelle-823.mypinata.cloud/ipfs/bafkreibqlgz36cado4gmjf5nfbrltkxuz5z2merrcd73caay7xhvtbapem --network sepolia
  ```

  another URI

  https://chocolate-nice-gazelle-823.mypinata.cloud/ipfs/bafkreicpr4fktjlebnhevziea44zbhjcnw7uvuvf5hkfoehtillxx3xbem

- NFT を Lock する

  ```bash
  npx hardhat lock --id 0 --network sepolia
  ```

- NFT を unLock する

  ```bash
  npx hardhat unlock --id 0 --network sepolia
  ```

- NFT を移転する。

  ```bash
  npx hardhat transfer --to 0x1295BDc0C102EB105dC0198fdC193588fe66A1e4 --id 0 --amount 1 --network sepolia
  ```

## デプロイしたコントラクト

[sepolia - 0xd312b009b83a311B9CF6d14663E9b5c7b156b186](https://sepolia.etherscan.io/address/0xd312b009b83a311B9CF6d14663E9b5c7b156b186#code)

## 参考文献

- [EIPS6268](https://eips.ethereum.org/EIPS/eip-6268)
- [[ERC6268] ERC1155 形式の NFT を SBT にする仕組みを理解しよう！](https://qiita.com/cardene/items/5ac107681eac3328258d)
