# UsagiVerify

<div align="center">
  <img src="./assets/1x/logo-round.png" height="200">
</div>

## Abstract

Usagi Verify is a product that utilizes ZK (Zero-Knowledge Proof) technology to enable the verification and utilization of real-world public information (such as Japan's MyNumber system) on the blockchain while maintaining confidentiality.

## Introduction

Usagi Verify utilizes Zero-Knowledge Proofs (ZK) to issue NFTs based on information managed by Japan's government service, MynaPortal. This enables innovative digital certification that combines transparency and privacy, such as vaccine certificates, medical expense records, and health check data.

For example, Usagi Verify can provide the following NFTs:

### Vaccine History NFT

Records of vaccinations like COVID-19 are stored on the blockchain as NFTs.

This creates certificates that are verifiable on-chain while maintaining confidentiality, eliminating the need for conventional face-to-face proof verification.

### Medical Expense NFTs

Medical expense data is tiered and issued as NFTs.

A smart contract for medical expense deductions verifies the information, enabling users to receive incentives like JPYC as tax refunds.

### Health NFTs

Health check data is tiered and issued as NFTs.

A system is created whereby healthier individuals receive more benefits, akin to income-based perks.

---

## Summary/Background

### Current Situation

Currently, there are few systems capable of linking strictly KYC-authenticated personal data, such as that stored in MynaPortal, with on-chain accounts.

While there are mechanisms to generate Account Abstraction Wallets from My Number Cards, there is no solution that issues NFTs reflecting real-world personal information derived from databases such as MynaPortal.

MynaPortal is an online service provided by Japan's government that consolidates all personal information tied to the My Number system. Individuals can confirm their information and perform administrative tasks through the platform.

### Problem

There are limited mechanisms that can securely and confidentially link critical personal data, like that stored in MynaPortal, to blockchain on-chain accounts. As of now, there is no solution specifically designed for MynaPortal.

MynaPortal APIs allow users to access a wealth of information, including health check results, vaccination records, and income details. While these APIs provide extensive data, their usage is strictly regulated by guidelines, requiring contracts and rigorous reviews, which limits utility.

Due to the sensitive nature of this information, robust privacy-preserving technology must be in place to enable such data to be used more widely. If this data can be securely brought into the blockchain ecosystem (e.g., income or health check records), reliable digital assets could circulate widely on-chain.

There are existing methods for transferring data from off-chain to on-chain, such as Oracles or ZKTLS; however, these approaches face the following challenges:

- Oracle challenges: Complete reliance on providers like Chainlink, compromising data confidentiality.
- ZKTLS challenges: The technology is still under development and currently requires dedicated browser extensions, limiting usability.

This initiative aims to address the limitations of these existing methods while implementing an MVP (Minimum Viable Product) as a proof of concept.

## Proposed Method

### Features

Using ZK (Zero Knowledge), without transferring the actual information obtained from MynaPortal to the on-chain, the system verifies the data and mints an NFT as its credential.

Additionally, we have developed a mechanism that applies a zero-knowledge proof to a simple protocol, modeled after TLS. This allows for more flexible handling of data, bringing it from off-chain to on-chain while ensuring confidentiality.

### Implementation Steps

1. Log in to MynaPortal and retrieve information.
2. Generate a ZK proof based on the information obtained in step 1.
3. Validate the ZK proof generated in step 2 and mint an NFT if the proof data is verified successfully.

### Development Methodology

#### Frontend:

An interface for users to perform authentication and manage NFTs. The frontend facilitates authentication with MynaPortal, data retrieval, ZK proof generation, NFT issuance, and review. It is implemented using Next.js and TypeScript.

#### Backend:

A system that mimics MynaPortal, implementing logic to retrieve health and income information. The backend also processes ZK proof generation, validation, and API functionalities for smart contract execution. It is implemented using Hono.

The API supports the following capabilities:

- Functionality for obtaining access tokens.
- Using acquired access tokens to retrieve personal data from a mock server that simulates MynaPortal.
- Validation of ZK proof and minting of NFTs.

#### Manpoko:

The mock server emulating MynaPortal. Based on reverse-engineering and conjectures about MynaPortal's API specifications, the mock server was developed.

Implemented a simplified protocol modeled after TLS. Following MynaPortal's API specifications, the server facilitates authentication for access token acquisition and APIs for retrieving personal data.

#### ZK Circuits:

Using zero-knowledge proofs to create on-chain verifiable data while maintaining the confidentiality of personal information. The ZK circuits are implemented utilizing Succinct's functionality.

Additionally, SPRM was employed as an extra privacy layer. SPRM uses hash function states to roll up data, ensuring privacy and reducing data size.

SPRM was developed by Aoki, a team member, and presented at the ETH Tokyo 2024 Hackathon. This instance demonstrates its application in other systems.

#### Smart Contracts:

Implemented logic for issuing/managing NFTs and credentials based on ERC6268. Once validated through ZK, the credential is minted as an NFT. Implementation was done using Hardhat and OpenZeppelin.

ERC6268 defines methods for converting ERC1155-format NFTs into SBTs. This ERC was proposed by team member Aoki.

#### Infrastructure:

The system is deployed using an on-premises Kubernetes cluster located in Tsukuba City, Ibaraki Prefecture. The mock server for MynaPortal and the backend API server run within this cluster.

Frontend hosting is done using Cloudflare Pages.

### Methodology to Validate MynaPortal Data

### Efficiency of Succinct

Using Succinct to develop ZK circuits proved highly effective. Even Rust assets developed 4 years ago were operational out-of-the-box.

### Code Utilization of Succinct

[GitHub - UsagiVerify/circuits](https://github.com/yuki-js/UsagiVerify/tree/main/circuits)

### Execution Process

### Common

#### Installation

```bash
npm i
```

#### Build

```bash
npm run build
```

### Smart Contracts

Commands below should be executed within the `contracts` folder.

#### Setup

```bash
cp .env.example .env
```

Set the following environment variables:

```txt
PRIVATE_KEY=""
ETHERSCAN_API_KEY=""
INFURA_API_KEY=""
```

#### Testing

```bash
npm run contract test
```

#### Deploy ERC1155WithLock Contract

```bash
npm run deploy:ERC1155WithLockModule
```

#### Verify Deployed Contract

```bash
npm run verify chain-11155111
```

#### Mint NFT

Specify the recipient address, token ID, amount, and tokenURI:

```bash
npx hardhat mint --to 0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072 --id 0 --amount 1 --uri https://bafkreif7hoezwvq3wugnyglntmijxamfxml6odljjenfuszazqv64x6b2m.ipfs.nftstorage.link/ --network sepolia
```

#### Lock NFT

Specify the token ID:

```bash
npx hardhat lock --id 0 --network sepolia
```

#### Unlock NFT

Specify the token ID:

```bash
npx hardhat unlock --id 0 --network sepolia
```

#### Transfer NFT

Specify the recipient address, token ID, and amount:

```bash
npx hardhat transfer --to 0x1295BDc0C102EB105dC0198fdC193588fe66A1e4 --id 0 --amount 1 --network sepolia
```

### Backend

Commands below should be executed within the `backend` folder.

#### Start Server Locally

```bash
npm run dev
```

### Frontend

Commands below should be executed within the `frontend` folder.

#### Start Server Locally

```bash
npm run dev
```

## Discussion

#### Frontend:

The frontend UI was implemented considering user experience. We employed Jotai as the state management library.

#### Backend:

Instead of ZKTLS, custom API logic for TLS combined with ZK proof validation/verification was implemented.

Despite the lack of publicly available specifications for MynaPortal’s API, thorough research enabled the development of a robust mock server.

#### ZK Circuits:

#### Smart Contracts:

ERC6268 was extended to implement an NFT contract enabling token IDs of ERC1155 NFTs to function as SBTs.

## Future Outlook

### Points of Improvement

During this hackathon, as MynaPortal, we provided a mock server simulating the specifications of the MynaPortal API. Moving forward, we aim to officially apply for the use of the MynaPortal API and improve the system so it operates with real data.

### How to Improve Moving Forward

- Modify the system to retrieve personal data from the MynaPortal API.
- Enable compatibility with Progressive Web Apps (PWA).
- Increase the types of NFTs that can be issued and set more detailed tiers.
- Explore specific use cases for NFT utilization in greater depth.

### Reflections on Participation

This was a great opportunity to learn about the MynaPortal API and the ERC6268 specifications. If mechanisms to securely link MynaPortal personal data with on-chain data are developed further, I believe the potential use cases will expand significantly, revitalizing the Web3 economic sphere.

## Architecture Diagram

![](./assets/png/overveiw1.png)

![](./assets/png/overveiw2.png)

## Tech Stack

### Frontend

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
