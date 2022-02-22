"use strict";
exports.__esModule = true;
exports.Mumbai = exports.Polygon = void 0;
exports.Polygon = {
    chainId: 137,
    chainName: 'Polygon',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
    getExplorerAddressLink: function (address) { return "https://polygonscan.com/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://polygonscan.com/tx/" + transactionHash; }
};
exports.Mumbai = {
    chainId: 80001,
    chainName: 'Mumbai',
    isTestChain: true,
    isLocalChain: false,
    multicallAddress: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    getExplorerAddressLink: function (address) { return "https://mumbai.polygonscan.com/address/" + address; },
    getExplorerTransactionLink: function (transactionHash) { return "https://mumbai.polygonscan.com/tx/" + transactionHash; }
};
exports["default"] = { Polygon: exports.Polygon, Mumbai: exports.Mumbai };
//# sourceMappingURL=polygon.js.map