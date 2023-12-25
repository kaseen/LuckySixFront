# LuckySix-Front

## [http://luckysix-react.s3-website.eu-central-1.amazonaws.com/](http://luckysix-react.s3-website.eu-central-1.amazonaws.com/)

Lucky Six is a Solidity-based game that features the random selection of 35 numbers from the range of 1 to 48 in each round. The lottery operates automatically, initiating a countdown upon the first ticket played in a round, allowing participation during this period. After the countdown, a request for a random salt is generated, from which random numbers are drawn. The system then initiates a new round, continuing this cycle indefinitely. For more details about the implementation of lottery logic in smart contracts, refer to this [link](https://github.com/kaseen/LuckySix/).

## Features
* Web interface built using [React.js](https://react.dev/).
* UI design implemented with [Material UI](https://mui.com/).
* Supports multiple networks, dynamically adjusting to the lottery on the selected network.
* Integrates with [wagmi](https://wagmi.sh/) and [viem](https://viem.sh/) interfaces for seamless interaction with the chosen network.
* Hosted on [AWS S3](https://aws.amazon.com/s3/) bucket, with automatic builds triggered via [GitHub Actions](https://github.com/features/actions) upon deploying to the master branch.

![luckysix1](https://github.com/kaseen/LuckySixFront/assets/48529822/33eb0f37-19ca-4add-b575-fd3e7301c97e)
![luckysix2](https://github.com/kaseen/LuckySixFront/assets/48529822/e1995db2-3c59-420e-82fd-70eac1ce862b)

### Lottery addresses

Sepolia: [0x4153a9Ea482a8cCb1737662FF840def7E087A6c8](https://sepolia.etherscan.io/address/0x4153a9ea482a8ccb1737662ff840def7e087a6c8)  
Mumbai: [0x86E074017b01541fcb8CB548Cbd61d9fF9D23a9a](https://mumbai.polygonscan.com/address/0x86e074017b01541fcb8cb548cbd61d9ff9d23a9a)

### For running locally
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