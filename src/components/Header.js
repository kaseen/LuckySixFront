import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const Header = () => {

    const { connect, connectors } = useConnect();
    const connector = connectors[0];
    
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { chain } = useNetwork();

    const Container = styled(Box)({
        padding: '25px',
        margin: '15px',
        borderRadius: '20px',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        border: '4px solid black',
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
        minWidth: '15%',
        fontSize: '150%'
    })

    return (
        <Container>
            <ContainerItem sx={{ 
                fontSize: '500%',
                fontWeight: '1000',
                textAlign: 'center',
            }}
            >
                LUCKY SIX
            </ContainerItem>

            <ContainerItem>
                <Box>{chain && <div>Network: {chain.name}</div>}</Box>
                <Box>{isConnected && <>Connected to: {(address.slice(0,5) + '...' + address.slice(38))}</>}</Box>
            </ContainerItem>

            <ContainerItem sx={{
                textAlign: 'right'
            }}>
                <Link to='/'>Lottery Entry</Link>
            </ContainerItem>

            <ContainerItem>
                <Link to='/payout'>Lottery Payout</Link>
            </ContainerItem>

            <ContainerItem sx={{
                textAlign: 'right'
            }}>
                {isConnected ? 
                    <ButtonStyled variant='contained' size='large' onClick={() => disconnect()}>Disconnect</ButtonStyled>
                        :
                    <ButtonStyled variant='contained' size='large' onClick={() => connect({ connector })}>Connect Wallet</ButtonStyled>
                }
            </ContainerItem>
        </Container>
    )
}