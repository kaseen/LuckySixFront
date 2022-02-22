import { Contract } from 'ethers';
import { Falsy } from '../model/types';
import { CallResult } from '../helpers';
export interface Call {
    contract: Contract;
    method: string;
    args: any[];
}
export declare function useCall(call: Call | Falsy): CallResult;
export declare function useCalls(calls: (Call | Falsy)[]): CallResult[];
//# sourceMappingURL=useCall.d.ts.map