# Usagi Verify

<div align="center">
  <img src="./assets/1x/logo-round.png" height="200">
</div>

## アブストラクト

Usagi Verify は、ZK（ゼロ知識証明）を活用して、現実世界の公的情報(日本だとマイナンバー等)を秘匿性を保ちながらブロックチェーン上で検証・活用できるようにするプロダクトです。

## イントロダクション

Usagi Verify は、ZK（ゼロ知識証明）を活用して、政府が管理する MynaPortal の情報をもとに、ワクチン接種証明や医療費情報、検診情報などを NFT として発行し、透明性とプライバシーを両立した新しいデジタル証明の形を提供します。

例えば次のような NFT を発行できます。

### ワクチン接種履歴 NFT

COVID-19 などのワクチン接種記録を NFT としてブロックチェーン上に記録。

従来の対面での証明に頼らず、秘匿性を保ちながらオンチェーンで検証可能な証明書を実現。

### 医療費 NFT

医療費情報をティア（階層）に分け、NFT として発行。

医療費控除スマートコントラクトで検証可能にし、控除還付として JPYC などのインセンティブを受け取れる仕組みを作り出す。

### 健康 NFT

健康診断情報をティアに分けて NFT として発行。

所得情報と同様に、健康な人ほど特典を受けられる仕組みを作りだす。

## 概要/背景

### Current situation

現状、MynaPortal のような厳格な KYC 済みのパーソナルデータをオンチェーン上のアカウントと紐付けるための仕組みは少ない。

マイナンバーカードから Account Abstraction Wallet を生成するような仕組みはあるものの、パーソナルデータを基にして(現実世界の生活を反映している)NFT を発行するような仕組みは存在していない。

MynaPortal とは、日本の政府が提供するオンラインサービスで、個人番号に紐づいた行政機関がもつあらゆる情報を一か所に集約し、個人が自分の情報を確認したり、行政手続きを行ったりすることができるプラットフォームです。

### Problem

MynaPortal にあるような重要な個人情報を秘匿化しつつ、安全にオンチェーン上のアカウントと紐付けられるような仕組みは少ない。少なくとも MynaPortal を対象にしたものはない。

MynaPortal では、健康診断結果、ワクチン接種記録、所得情報などを取得できる 自己情報取得 API や医療保険情報取得 API が存在する。取得できる情報量は豊富であり、その情報を元にして自由なデータの利活用が可能となる。

しかし、この API の利用方法についてはガイドラインで厳格に定められており、利用に際しては契約締結や厳しい審査が必要であり、活用の幅がまだまだ狭いという課題が存在する。非常にセンシティブな情報なため秘匿化などのプライバシー技術がしっかり担保されていないと活用の幅を広げることは難しい。

もしもこのデータを秘匿化しつつ所得情報や健康診断結果をブロックチェーンの世界に持ち込むことができるのであれば、リソースが信頼できるデジタルアセットをたくさんオンチェーンに流通されることができる。

オフチェーンからオンチェーン上にデータを持ってくる方法としてオラクルや ZKTLS といった方法があるがそれぞれ以下のような課題がある。

- オラクルの課題： Chainlink のようなプロバイダーに完全に依存することになり、データの秘匿性が保たれない
- ZKTLS の課題： 現在目下開発中で、専用のブラウザ拡張機能が必要な状態。汎用性がない。

今回は上記の課題も解決するための手法を考え、MVP として実装した。

## 提案手法

### できること

ZK を利用し、MynaPortal から取得した情報そのものをオンチェーンに渡すことなく検証させ、そのクレデンシャルとして NFT をミントさせる。

また、 TLS を模した簡易なプロトコルに対してゼロ知識証明を施す仕組みを開発した。これにより、秘匿性を保ちながらより柔軟にオフチェーンからオンチェーン上にデータを持ってくることができるようになった。

### 実現方法

1. MynaPortal にログイン後、情報を取得してくる。
2. 1.で取得した情報を基に ZK proof を生成する。
3. 2.で生成した ZK Proof を検証させて proof のデータに問題がなかった場合に NFT を発行する。

### どのように作ったか

#### フロントエンド：

ユーザーが認証や NFT の発行・管理を行うインターフェース。MynaPortal への認証と情報取得、ZK Proof の作成、NFT の発行・確認までが行える。Next.js と TypeScript を利用して実装

#### バックエンド：

MynaPortal を模した機能を実装し、健康情報や所得情報が取得できるようなロジックを実装。ZK proof の作成や検証を行うためのロジックやスマートコントラクトの機能を実行するための API を実装。Hono を利用して実装。

API の機能としては以下の機能を実装しています。

- アクセストークンを取得する機能
- アクセストークンを使って、MynaPortal のモックサーバーからパーソナルデータを取得する機能
- ZK Proof の検証と NFT のミントを行う機能

#### Manpoko

MynaPortal のモックサーバーを実装。MynaPortal の API 仕様をリバースエンジニアリングと勝手な想像により、実装した。

TLS の簡易なプロトコルを模したものを実装。MynaPortal の API 仕様に従い、アクセストークンを取得するための認証や、パーソナルデータを取得するための API を実装。

#### ZK 回路:

ゼロ知識証明を活用し、個人情報を秘匿したままオンチェーンで検証可能なデータを作成する。ZK 回路は Succinct の機能を利用して実装。

ゼロ知識証明に加えて、追加のプライバシーレイヤーとして、SPRM を利用。SPRM はハッシュ関数のステートをロールアップし、個人情報を守ったりデータを小さくする技術である。

なお、この SPRM は、チームメンバーの青木が開発したもので、ETHTokyo 2024 Hackathon で発表したものです。今回はその技術をほかのシステムに取り入れた応用例となります。

#### スマートコントラクト：

ERC6268 を継承した NFT の発行・管理、検証ロジックを実装。ZK による検証が完了したらクレデンシャルとして UNTI がミントされる。hardhat と OpenZeppelin を利用して実装。

ERC6268 とは、ERC1155 形式の NFT を SBT にする仕組みを定義した ERC である。チームメンバーの青木が提案したものである。

#### インフラ:

オンプレミス Kubernetes で構築。
クラスタは茨城県つくば市にある。MynaPortal のモックサーバーとバックエンド API サーバーをデプロイしている。

Cloudflare Pages を利用してフロントエンドをホスティング。

### マイナポデータを証明する方法

### Succinct がどのように効果的であったか

Succinct を使った ZK 回路の開発は非常に良好で、既存の Rust アセットも問題なく動かすことができた。4 年前に開発されたライブラリですら、Out-of-box で動かすことができた。

### Succinct を実際に活用しているコード

[GitHub - UsagiVerify/circuits](https://github.com/yuki-js/UsagiVerify/tree/main/circuits)

### 動かし方

### 共通

#### インストール

```bash
npm i
```

#### ビルド

```bash
npm run build
```

### スマートコントラクト

以下のコマンドは、 `contracts` フォルダ配下で実行してください。

#### セットアップ

```bash
cp .env.example .env
```

以下の環境変数を設定する。

```txt
PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
INFURA_API_KEY=""
```

#### テスト

```bash
npm run contract test
```

#### ERC1155WithLock コントラクトをデプロイする

```bash
npm run deploy:ERC1155WithLockModule
```

#### デプロイしたコントラクトを verify する

```bash
npm run  verify chain-11155111
```

#### NFT をミントする

移転先のアドレス、トークン ID、amount、tokenURI を指定して実行する。

```bash
npx hardhat mint --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --id 0 --amount 1 --uri https://bafkreif7hoezwvq3wugnyglntmijxamfxml6odljjenfuszazqv64x6b2m.ipfs.nftstorage.link/ --network sepolia
```

#### NFT を Lock する

トークン ID を指定して実行する。

```bash
npx hardhat lock --id 0 --network sepolia
```

#### NFT を unLock する

トークン ID を指定して実行する。

```bash
npx hardhat unlock --id 0 --network sepolia
```

#### NFT を移転する

移転先のアドレス、トークン ID、amount を指定して実行する。

```bash
npx hardhat transfer --to 0x1295BDc0C102EB105dC0198fdC193588fe66A1e4 --id 0 --amount 1 --network sepolia
```

### backend

以下のコマンドは、 `backend` フォルダ配下で実行してください。

#### ローカルでサーバーを起動する

```bash
npm run dev
```

### フロントエンド

以下のコマンドは、 `frontend` フォルダ配下で実行してください。

#### ローカルでサーバーを起動する

```bash
npm run dev
```

## Discussion

#### フロントエンド：

フロントエンドについては、 Claude-3.7-sonnet を最大限利用し、スッキリして楽しい UI を実装しました。

状態管理には、 Jotai という状態管理ライブラリを使いました。

#### バックエンド：

ZKTLS の代わりに TLS と ZK の署名・検証ロジックが動く独自の API サーバーを実装しました。

MynaPortal の API 仕様については非公開となっていますが、頑張って仕様を調査し、モックサーバーを実装しました。

#### ZK サーキット：

#### スマートコントラクト：

ERC6268 を継承した NFT コントラクトを実装しました。これによりトークン ID 毎に ERC1155 の NFT を SBT 化させることができるようになりました。

## 今後の展望

### 至らなかった点

MynaPortal として今回のハッカソンでは MynaPortal API の仕様を模したモックサーバーを用意したが、今後は正式に MynaPortal API の利用申請を行い、本当のデータで動作するように改良していきたいと考えている。

### 今後どのように改善していくか

- MynaPortal API からパーソナルデータを取得するように修正する。
- PWA に対応させる。
- 発行できる NFT の種類を増やし、ティアを細かく設定する。
- NFT の具体的な利用ユースケースを深掘りする。

### 参加してみての感想

MynaPortal の API や ERC6268 の仕様を学ぶ非常に良い機会となった。MynaPortal のパーソナルデータとオンチェーン上のデータを安全に紐付けられる仕組みが発達すれば、活用シーンはグッと広がり Web3 の経済圏を活発化できるようになるのではないかと感じた。

## アーキテクチャ図

![](./assets/png/overveiw1.png)

![](./assets/png/overveiw2.png)

## リポジトリの構成

このプロジェクトのソースコードは、 npm workspace を利用したモノレポ構成で管理されています。

```bash
.
├── README.md
├── README_ja.md
├── assets              画像データなどを保管したフォルダ
├── backend             API関連のソースコードを格納したフォルダ
├── circuits            ZKサーキット関連のソースコードを格納したフォルダ
├── contract            スマートコントラクト関連のソースコードを格納したフォルダ
├── frontend            フロントエンド関連のソースコードを格納したフォルダ
├── infrastructure      インフラ関連のソースコードを格納したフォルダ
├── package-lock.json
└── package.json
```

## 使った技術スタック

### フロントエンド系

- Prettier
- Next.js (page router)
- Plasmic
- Tailwind CSS
- Jotai
- TypeScript
- Cloudflare Pages

### バックエンド系

- Hono
- TypeScript
- Node.js
- node:crypto

### スマートコントラクト系

- Hardhat
- Solidity
- TypeScript
- Infura
- viem
- ethereum sepolia
- ERC6268
- ERC1155
- ERC165
- OpenZeppelin

### インフラ系

- オンプレミス(つくば市から愛を込めて)

### ZK 系

- succinct
- Rust

## 参考文献

### Succinct

[Succinct 公式サイトブログ](https://blog.succinct.xyz/succinct-network/)

[Succinct 公式サイト](https://www.succinct.xyz/)

### ERC6268

[[ERC6268] ERC1155 形式の NFT を SBT にする仕組みを理解しよう！](https://qiita.com/cardene/items/5ac107681eac3328258d)

[GitHub - ethereum/ERCs/erc-6268](https://github.com/ethereum/ERCs/blob/master/ERCS/erc-6268.md)

### zkTLS

[zkTLS: The Key to Secure and Private Online Transactions](https://www.zkon.xyz/blog/zktls-secure-private-online-transactions)

[Understanding zkTLS in one article: Secure information transmission, the next new narrative of ZK?](https://www.bitget.com/news/detail/12560604214152)

[ReclaimProtocol 公式サイト](https://reclaimprotocol.org/)

[ZkPassZkPass 公式サイト](https://zkpass.org/)

### zkVM -MynaPortal 自己情報取得 API

[MynaPortal 自己情報取得 API 利用ガイドライン](https://myna.go.jp/html/api/pdf/api_guideline.pdf)

[MynaPortal API 仕様公開サイト](https://myna.go.jp/html/api/index.html)
