"use strict";
exports.__esModule = true;
exports.useRawCall = exports.useRawCalls = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
function useRawCalls(calls) {
    var _a = providers_1.useChainState(), dispatchCalls = _a.dispatchCalls, value = _a.value;
    react_1.useEffect(function () {
        var filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return function () { return dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls }); };
    }, [JSON.stringify(calls), dispatchCalls]);
    return react_1.useMemo(function () {
        return calls.map(function (call) {
            var _a, _b;
            if (call && value) {
                return (_b = (_a = value.state) === null || _a === void 0 ? void 0 : _a[call.address]) === null || _b === void 0 ? void 0 : _b[call.data];
            }
        });
    }, [JSON.stringify(calls), value]);
}
exports.useRawCalls = useRawCalls;
function useRawCall(call) {
    return useRawCalls([call])[0];
}
exports.useRawCall = useRawCall;
//# sourceMappingURL=useRawCalls.js.map