import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const Header = () => {

    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    });
    const { disconnect } = useDisconnect();


    // TODO
    if(isConnected)
        return (
            <div>
                Connected to {(address.slice(0,4) + '...' + address.slice(38))}
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    else
        return (
            <div>
                <button onClick={() => connect()}>Connect Wallet</button>
            </div>
        )
}
