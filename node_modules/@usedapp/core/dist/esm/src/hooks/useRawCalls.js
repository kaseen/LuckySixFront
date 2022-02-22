import { useEffect, useMemo } from 'react';
import { useChainState } from '../providers';
export function useRawCalls(calls) {
    const { dispatchCalls, value } = useChainState();
    useEffect(() => {
        const filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return () => dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls });
    }, [JSON.stringify(calls), dispatchCalls]);
    return useMemo(() => calls.map((call) => {
        var _a, _b;
        if (call && value) {
            return (_b = (_a = value.state) === null || _a === void 0 ? void 0 : _a[call.address]) === null || _b === void 0 ? void 0 : _b[call.data];
        }
    }), [JSON.stringify(calls), value]);
}
export function useRawCall(call) {
    return useRawCalls([call])[0];
}
//# sourceMappingURL=useRawCalls.js.map