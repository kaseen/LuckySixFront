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
        margin: '15px',
        borderRadius: '20px',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        border: '2px solid black',
        background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,0.7) 100%)',

        fontFamily: 'Permanent Marker',
        color: '#afbfff'
    });

    const ButtonStyled = styled(Button)({
        backgroundColor: 'rgba(9,9,121,0.4)',
        borderRadius: '5px',
        border: '2px solid black',
    });

    const ContainerItem = styled(Box)({
        minWidth: '20%'
    })

    return (
        <Container>
            <ContainerItem sx={{
                fontSize: '150%',
            }}>
                {isConnected && <>Connected to: {(address.slice(0,5) + '...' + address.slice(38))}</>}
            </ContainerItem>

            <ContainerItem sx={{ 
                fontSize: '500%',
                fontWeight: '1000',
                textAlign: 'center',
            }}
            >
                LUCKY SIX
            </ContainerItem>

            <ContainerItem sx={{
                textAlign: 'right'
            }}>
                {isConnected ? 
                    <ButtonStyled variant='contained' size='large' onClick={() => disconnect()}>Disconnect</ButtonStyled>
                        :
                    <ButtonStyled variant='contained' size='large' onClick={() => connect()}>Connect Wallet</ButtonStyled>
                }
            </ContainerItem>

        </Container>
    )
}