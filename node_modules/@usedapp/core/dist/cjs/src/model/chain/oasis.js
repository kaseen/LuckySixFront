"use strict";
exports.__esModule = true;
exports.OasisEmerald = void 0;
exports.OasisEmerald = {
    chainId: 42262,
    chainName: 'OasisEmerald',
    isTestChain: false,
    isLocalChain: false,
    multicallAddress: '0xA1513CE1a147BB84E04cD61d877d598C018a460F',
    getExplorerAddressLink: function (address) { return "https://explorer.emerald.oasis.dev/address/" + address + "/transactions"; },
    getExplorerTransactionLink: function (transactionHash) {
        return "https://explorer.emerald.oasis.dev/tx/" + transactionHash + "/internal-transactions";
    }
};
exports["default"] = { OasisEmerald: exports.OasisEmerald };
//# sourceMappingURL=oasis.js.map