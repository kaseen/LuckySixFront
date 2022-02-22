"use strict";
exports.__esModule = true;
exports.useChainState = exports.ChainStateContext = void 0;
var react_1 = require("react");
exports.ChainStateContext = react_1.createContext({
    multicallAddress: '',
    dispatchCalls: function () {
        // empty
    }
});
var useChainState = function () { return react_1.useContext(exports.ChainStateContext); };
exports.useChainState = useChainState;
//# sourceMappingURL=context.js.map