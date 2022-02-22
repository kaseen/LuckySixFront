/// <reference types="react" />
/// <reference types="node" />
import { Network } from './model';
import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers';
import { EventEmitter } from 'events';
export declare const NetworkContext: import("react").Context<{
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => Promise<void>;
    deactivate: () => void;
    network: Network;
}>;
export declare function useNetwork(): {
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: JsonRpcProvider | (EventEmitter & ExternalProvider)) => Promise<void>;
    deactivate: () => void;
    network: Network;
};
//# sourceMappingURL=context.d.ts.map