# UsagiVerify

<div align="center">
  <img src="./docs/logo.jpeg" height="200">
</div>

## Overview

## Live Demo

[https://9beb5d7a.usagiverify.pages.dev/](https://9beb5d7a.usagiverify.pages.dev/)

## Demo Video

## How to work

### install

```bash
npm i
```

### smartContract

Please exeucte under `contract` folder.

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
  npm run compile
  ```

- test

  ```bash
  npm run test
  ```

- deploy ERC1155WithLock

  ```bash
  npm run deploy:ERC1155WithLockModule
  ```

- verify

  ```bash
  npm run verify chain-11155111
  ```

### backend

Please exeucte under `backend` folder.

- start local server

  ```bash
  npm run dev
  ```

### frontend

Please exeucte under `frontend` folder.

- build

  ```bash
  npm run build
  ```

- local start

  ```bash
  npm run dev
  ```
