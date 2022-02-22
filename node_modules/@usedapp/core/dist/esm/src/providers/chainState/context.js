import { createContext, useContext } from 'react';
export const ChainStateContext = createContext({
    multicallAddress: '',
    dispatchCalls: () => {
        // empty
    },
});
export const useChainState = () => useContext(ChainStateContext);
//# sourceMappingURL=context.js.map