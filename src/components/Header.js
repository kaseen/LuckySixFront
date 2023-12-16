import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const Header = () => {

    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    });
    const { disconnect } = useDisconnect();

    const Container = styled(Box)({
        padding: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    });

    const ButtonStyled = styled(Button)({
        backgroundColor: '#F8F8F8',
        borderRadius: '5px',
    });

    const ContainerItem = styled(Box)({
        minWidth: '20%'
    })

    return (
        <Container>
            <ContainerItem sx={{
                fontSize: '100%',
            }}>
                {isConnected && <>Connected to: {(address.slice(0,5) + '...' + address.slice(38))}</>}
            </ContainerItem>

            <ContainerItem sx={{ 
                fontSize: '170%',
                fontWeight: '1000',
                textAlign: 'center'
            }}>
                LUCKY SIX
            </ContainerItem>

            <ContainerItem sx={{
                textAlign: 'right'
            }}>
                {isConnected ? 
                    <ButtonStyled onClick={() => disconnect()}>Disconnect</ButtonStyled>
                        :
                    <ButtonStyled onClick={() => connect()}>Connect Wallet</ButtonStyled>
                }
            </ContainerItem>

        </Container>
    )
}