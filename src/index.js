import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// TODO: Polygon, Mumbai, Alchemy
import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { createPublicClient, http } from 'viem';

// Wagmi config
const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
        chain: sepolia,
        transport: http()
    })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <App />
        </WagmiConfig>
    </React.StrictMode>
);
