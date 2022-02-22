"use strict";
exports.__esModule = true;
exports.Arbitrum = exports.ArbitrumRinkeby = void 0;
exports.ArbitrumRinkeby = {
    chainId: 421611,
    chainName: 'ArbitrumRinkeby',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0xd27BEFd29F8Da4E187fDAEf663aEDF7742f9F47F',
    getExplorerAddressLink: function (address) { return "https://testnet.arbiscan.io/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://testnet.arbiscan.io/tx/" + transactionHash; }
};
exports.Arbitrum = {
    chainId: 42161,
    chainName: 'Arbitrum',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x8a0bd1773139C6609e861B9ab68082587a3cD581',
    getExplorerAddressLink: function (address) { return "https://arbiscan.io/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://arbiscan.io/tx/" + transactionHash; }
};
exports["default"] = {
    ArbitrumRinkeby: exports.ArbitrumRinkeby,
    Arbitrum: exports.Arbitrum
};
//# sourceMappingURL=arbitrum.js.map