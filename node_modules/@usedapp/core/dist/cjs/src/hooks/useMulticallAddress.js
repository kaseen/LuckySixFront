"use strict";
exports.__esModule = true;
exports.useMulticallAddress = void 0;
var providers_1 = require("../providers");
function useMulticallAddress() {
    return providers_1.useChainState().multicallAddress;
}
exports.useMulticallAddress = useMulticallAddress;
//# sourceMappingURL=useMulticallAddress.js.map