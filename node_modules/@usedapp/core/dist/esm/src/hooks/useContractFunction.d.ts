import { TransactionOptions } from '../../src';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { LogDescription } from 'ethers/lib/utils';
export declare function connectContractToSigner(contract: Contract, options?: TransactionOptions, library?: JsonRpcProvider): Contract;
export declare function useContractFunction(contract: Contract, functionName: string, options?: TransactionOptions): {
    send: (...args: any[]) => Promise<void>;
    state: import("..").TransactionStatus;
    events: LogDescription[] | undefined;
    resetState: () => void;
};
//# sourceMappingURL=useContractFunction.d.ts.map