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
