# UsagiVerify

<div align="center">
  <img src="./docs/logo.jpeg" height="200">
</div>

## Overview

## Live Demo

## Demo Video

## How to work

### install

```bash
npm i
```

### smartContract

- Setup

  ```bash
  cp .env.example .env
  ```

  ```txt
  PRIVATE_KEY=""
  ETHERSCAN_API_KEY=""
  INFURA_API_KEY=""
  ```

- compile

  ```bash
  npm run contract compile
  ```

- test

  ```bash
  npm run contract test
  ```

- deploy ERC1155WithLock

  ```bash
  npm run contract deploy:ERC1155WithLockModule
  ```

- verify

  ```bash
  npm run contract verify chain-11155111
  ```

### backend

- start local server

  ```bash
  npm run backend dev
  ```

### frontend

- build

  ```bash
  npm run frontend build
  ```

- local start

  ```bash
  npm run frontend dev
  ```
