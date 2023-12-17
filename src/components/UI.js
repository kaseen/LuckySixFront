import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction
} from 'wagmi';

import { parseUnits } from 'viem';
import LuckySixABI from '../abi.json';
const contractAddress = '0x4153a9Ea482a8cCb1737662FF840def7E087A6c8';

/**
 * @dev Creating an array of 6 text fields, each with a unique identifier, where the `combination`
 *      variable from `Body.js` is updated with a function passed as a prop. This function changes
 *      the state of an array on any change in those fields.
 */
export const InputNumbers = (props) => {
    return (
        <section>
            {
                Array.from({ length: 6 },
                (_, i) =>
                <TextField
                    key={i}
                    onChange={(v) => props.function(i, v.target.value)}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    sx={{
                        marginTop: '10px',
                        width: 60,
                        height: 56,
                        marginLeft: '5px',
                        marginRight: '5px',
                        border: '2px solid black',
                        borderRadius: '10px'
                    }}
                />
                )
            }
        </section>
    )
}

export const EtherField = (props) => {
    return (
        <TextField
            inputProps={{ min: 0, style: { textAlign: 'center' }}}
            onChange={(v) => props.function(v.target.value)}
            sx={{
                border: '2px solid black',
                borderRadius: '10px',
                marginTop: '10px'
            }}
            helperText='value you want to play (fees included)'
        />
    )
}

/**
 * @dev The `props` argument encompasses the `combination` and `amountToPlay` variables from `Body.js`.
 *      It's worth noting that the button is only clickable when the wallet is connected. Additionally,
 *      the button is disabled during the transaction pending phase, displaying the transaction hash upon
 *      success. In case of an error, an error message is presented.
 */
export const PlayLottery = (props) => {

    const { config, error, isError } = usePrepareContractWrite({
        address: contractAddress,
        abi: LuckySixABI,
        functionName: 'playTicket',
        args: [props.combination],
        value: parseUnits(`${props.amountToPlay}`, 18)
    });

    const { data, write } = useContractWrite(config);
    
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    });

    const ButtonStyled = styled(Button)({
        backgroundColor: 'rgba(9,9,121,0.4)',
        borderRadius: '5px',
        border: '2px solid black',

        marginTop: '10px',
        marginBottom: '10px',
    });
 
    return (
        <>
            <ButtonStyled
                variant='contained'
                size='large'
                disabled={!write || isLoading}
                onClick={() => write?.()}
            >Play Lottery</ButtonStyled>
            {isSuccess && <div> Successfully played a ticket! Tx hash: {data?.hash} </div>}
            {isError && <div>Error: {error.message}</div>}
        </>
    )
}