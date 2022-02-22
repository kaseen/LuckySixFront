import { useMemo } from 'react';
import { useRawCalls } from './useRawCalls';
import { decodeCallResult, encodeCallData } from '../helpers';
export function useCall(call) {
    return useCalls([call])[0];
}
export function useCalls(calls) {
    const results = useRawCalls(calls.map(encodeCallData));
    return useMemo(() => results.map((result, idx) => decodeCallResult(calls[idx], result)), [results]);
}
//# sourceMappingURL=useCall.js.map