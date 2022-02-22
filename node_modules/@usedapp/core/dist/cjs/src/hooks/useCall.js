"use strict";
exports.__esModule = true;
exports.useCalls = exports.useCall = void 0;
var react_1 = require("react");
var useRawCalls_1 = require("./useRawCalls");
var helpers_1 = require("../helpers");
function useCall(call) {
    return useCalls([call])[0];
}
exports.useCall = useCall;
function useCalls(calls) {
    var results = useRawCalls_1.useRawCalls(calls.map(helpers_1.encodeCallData));
    return react_1.useMemo(function () { return results.map(function (result, idx) { return helpers_1.decodeCallResult(calls[idx], result); }); }, [results]);
}
exports.useCalls = useCalls;
//# sourceMappingURL=useCall.js.map