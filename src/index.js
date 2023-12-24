import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { WagmiConfig, configureChains, createConfig, createStorage } from 'wagmi';
import { sepolia, polygonMumbai, localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';

const { chains, publicClient } = configureChains(
    [sepolia, polygonMumbai, localhost],
    [publicProvider()]
);

const storage = createStorage({
    storage: {
        getItem: (_key) => '',
        setItem: (_key, _value) => null,
        removeItem: (_key) => null
    }
})


const config = createConfig({
    autoConnect: true,
    connectors: [
        new InjectedConnector({ 
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true
            }
        })
    ],
    publicClient,
    storage
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    </React.StrictMode>
);
