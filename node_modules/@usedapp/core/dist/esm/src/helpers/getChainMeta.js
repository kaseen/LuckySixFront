import * as chains from '../model/chain';
export function getChainMeta(chainId) {
    return Object.values(chains).find((chain) => chain.chainId === chainId);
}
//# sourceMappingURL=getChainMeta.js.map