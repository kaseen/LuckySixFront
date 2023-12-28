# LuckySix-Front

## [http://luckysix-react.s3-website.eu-central-1.amazonaws.com/](http://luckysix-react.s3-website.eu-central-1.amazonaws.com/)

Lucky Six is a Solidity-based game that features the random selection of 35 numbers from the range of 1 to 48 in each round. The lottery operates automatically, initiating a countdown upon the first ticket played in a round, allowing participation during this period. After the countdown, a request for a random salt is generated, from which random numbers are drawn. The system then initiates a new round, continuing this cycle indefinitely. For more details about the implementation of lottery logic in smart contracts, refer to this [link](https://github.com/kaseen/LuckySix/).

## Features
* Web interface built using [React.js](https://react.dev/).
* UI design implemented with [Material UI](https://mui.com/).
* Supports multiple networks, dynamically adjusting to the lottery on the selected network.
* Integrates with [wagmi](https://wagmi.sh/) and [viem](https://viem.sh/) interfaces for seamless interaction with the chosen network.
* Hosted on [AWS S3](https://aws.amazon.com/s3/) bucket, with automatic builds triggered via [GitHub Actions](https://github.com/features/actions) upon deploying to the master branch.

## Demonstration
Playing the lottery is straightforward - users only need a browser with a wallet extension installed. The application connects to the `InjectedConnector`, supporting wallets that inject an Ethereum Provider, such as the MetaMask browser extension.
![luckysix-main](https://github.com/kaseen/LuckySixFront/assets/48529822/f5aa74ed-c43a-4004-a09e-fcd7c57958d1)

The lottery system features two distinct pools: one for collecting owner fees and another for the prize pool, ensuring that the owner cannot 'rug pull'. Check the [smart contract code](https://github.com/kaseen/LuckySix/) for a more in-depth understanding. After the numbers are drawn, users can easily withdraw their earnings by clicking the 'Redeem' button, triggering a browser notification. The process only requires the user to sign a transaction, and the funds are sent directly to their wallet address, as demonstrated in the gif below.
![payoutgif](https://github.com/kaseen/LuckySixFront/assets/48529822/fcb0b7cf-5b8e-4602-b963-3855868aa75a)

## Lottery addresses

Sepolia: [0x4153a9Ea482a8cCb1737662FF840def7E087A6c8](https://sepolia.etherscan.io/address/0x4153a9ea482a8ccb1737662ff840def7e087a6c8)  
Mumbai: [0x86E074017b01541fcb8CB548Cbd61d9fF9D23a9a](https://mumbai.polygonscan.com/address/0x86e074017b01541fcb8cb548cbd61d9ff9d23a9a)

## For running locally
Install all the dependencies listed within package.json.
```
npm install --legacy-peer-deps
```

Then run with:
```
npm start
```

## License

This project is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).