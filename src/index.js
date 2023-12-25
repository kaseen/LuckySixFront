/**
 * Copyright (c) 2023 Vukašin Tasić
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
