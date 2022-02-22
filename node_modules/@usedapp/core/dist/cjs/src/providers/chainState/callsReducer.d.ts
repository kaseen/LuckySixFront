export declare type Action = AddCall | RemoveCall;
export interface RawCall {
    address: string;
    data: string;
}
/**
 * @deprecated It's recommended to use RawCall instead
 */
export interface ChainCall {
    address: string;
    data: string;
}
interface AddCall {
    type: 'ADD_CALLS';
    calls: RawCall[];
}
interface RemoveCall {
    type: 'REMOVE_CALLS';
    calls: RawCall[];
}
export declare function callsReducer(state: RawCall[] | undefined, action: Action): RawCall[];
export {};
//# sourceMappingURL=callsReducer.d.ts.map