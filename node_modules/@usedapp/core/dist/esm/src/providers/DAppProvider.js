import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ConfigProvider } from './config';
import { BlockNumberProvider } from './blockNumber';
import { ChainStateProvider } from './chainState';
import { useConfig } from './config/context';
import { NotificationsProvider } from './notifications/provider';
import { NetworkActivator } from './NetworkActivator';
import { TransactionProvider } from './transactions/provider';
import { LocalMulticallProvider } from './LocalMulticallProvider';
import { NetworkProvider } from './network';
import { InjectedNetworkProvider } from './injectedNetwork';
export function DAppProvider({ config, children }) {
    return (_jsx(ConfigProvider, Object.assign({ config: config }, { children: _jsx(DAppProviderWithConfig, { children: children }, void 0) }), void 0));
}
const getMulticallAddresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => (result[network.chainId] = network.multicallAddress));
    return result;
};
const getMulticall2Addresses = (networks) => {
    const result = {};
    networks === null || networks === void 0 ? void 0 : networks.forEach((network) => {
        if (network.multicall2Address) {
            result[network.chainId] = network.multicall2Address;
        }
    });
    return result;
};
function DAppProviderWithConfig({ children }) {
    const { multicallAddresses, networks, multicallVersion } = useConfig();
    const defaultAddresses = useMemo(() => (multicallVersion === 1 ? getMulticallAddresses(networks) : getMulticall2Addresses(networks)), [networks, multicallVersion]);
    const multicallAddressesMerged = Object.assign(Object.assign({}, defaultAddresses), multicallAddresses);
    return (_jsx(NetworkProvider, { children: _jsx(InjectedNetworkProvider, { children: _jsxs(BlockNumberProvider, { children: [_jsx(NetworkActivator, {}, void 0),
                    _jsx(LocalMulticallProvider, { children: _jsx(ChainStateProvider, Object.assign({ multicallAddresses: multicallAddressesMerged }, { children: _jsx(NotificationsProvider, { children: _jsx(TransactionProvider, { children: children }, void 0) }, void 0) }), void 0) }, void 0)] }, void 0) }, void 0) }, void 0));
}
//# sourceMappingURL=DAppProvider.js.map