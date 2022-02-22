import { ChainId } from '../constants';
export declare function useChainMeta(chainId: ChainId): import("../constants").Chain | {
    chainName: string;
    chainId: number;
    isTestChain: boolean;
    isLocalChain: boolean;
    multicallAddress: string;
    multicall2Address?: string | undefined;
    getExplorerAddressLink: (address: string) => string;
    getExplorerTransactionLink: (address: string) => string;
} | undefined;
//# sourceMappingURL=useChainMeta.d.ts.map