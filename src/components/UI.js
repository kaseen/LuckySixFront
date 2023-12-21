import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react';
import { styled } from '@mui/system';

import {
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useAccount
} from 'wagmi';

import { formatUnits, parseUnits } from 'viem';
import LuckySixABI from '../abi.json';

const LuckySixContract = {
    address: '0x4153a9Ea482a8cCb1737662FF840def7E087A6c8',
    abi: LuckySixABI
}

// TODO
const currency = 'ETH'

/**
 * @dev The styling for the primary component, which is revealed through routing, centers the component in
 *      the middle of the screen. The margins on the sides are precisely calculated as (100% - width)/2.
 */
export const bodyContainerStyle = () => {

    const width = '32%';
    const height = '40%';
    const padding = '15px';
    const sides = `${(100 - width.match(/\d+/g))/2}%`

    return {
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
        padding: padding,
        left: sides,
        right: sides,

        position: 'absolute',
        marginTop: '120px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        background: 'linear-gradient(120deg, #020024 0%, #090979 0%, #00d4ff 60%)',
        borderRadius: '20px',
        border: '4px solid black',

        fontFamily: 'Ubuntu',
        fontSize: '16px'
    };
}

// =============================================================
//                        LOTTERY ENTRY
// =============================================================
/**
 * @dev Creating an array of 6 text fields, each with a unique identifier, where the `combination`
 *      variable from `Body.js` is updated with a function passed as a prop. This function changes
 *      the state of an array on any change in those fields.
 */
export const InputNumbers = ({ function: setCombination }) => {
    return (
        <section>
            {
                Array.from({ length: 6 },
                (_, i) =>
                <TextField
                    key={i}
                    onChange={(v) => setCombination(i, v.target.value)}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    sx={{
                        marginTop: '15px',
                        width: 60,
                        height: 56,
                        marginLeft: '5px',
                        marginRight: '5px',
                        border: '2px solid black',
                        borderRadius: '10px'
                    }}
                    placeholder={`${i+1}`}
                />
                )
            }
        </section>
    )
}

/**
 * @dev This component assigns the `amountToPlay` to its parent component.
 */
export const EtherField = ({ function: setAmountToPlay }) => {
    return (
        <TextField
            inputProps={{ min: 0, style: { textAlign: 'center' }}}
            onChange={(v) => setAmountToPlay(v.target.value)}
            sx={{
                border: '2px solid black',
                borderRadius: '10px',
                marginTop: '15px'
            }}
            helperText='value you want to play (fees included)'
            placeholder='0.02'
        />
    )
}

/**
 * @dev The `props` argument encompasses the `combination` and `amountToPlay` variables from `Body.js`.
 *      It's worth noting that the button is only clickable when the wallet is connected. Additionally,
 *      the button is disabled during the transaction pending phase, displaying the transaction hash upon
 *      success. In case of an error, an error message is presented.
 */
export const PlayLottery = ({ combination, amountToPlay }) => {

    const { config, error, isError } = usePrepareContractWrite({
        address: LuckySixContract['address'],
        abi: LuckySixABI,
        functionName: 'playTicket',
        args: [combination],
        value: parseUnits(`${amountToPlay}`, 18),
        //enabled: false
    });

    const { data, write } = useContractWrite(config);
    
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    });

    const ButtonStyled = styled(Button)({
        backgroundColor: 'rgba(9,9,121,0.4)',
        borderRadius: '5px',
        border: '2px solid black',

        marginTop: '15px',
        marginBottom: '8px',
    });

    /**
     * @dev To enhance error readability, we parse the error message by identifying a `Error` keyword. Subsequently,
     *      we display the content situated between the keyword and the end of the error message.
     */
    const parseError = (error) => {
        const keyword = 'Error: ';
        const result = error.slice(error.search(keyword) + keyword.length);

        return result.split('(')[0];
    }

    return (
        <>
            <ButtonStyled
                variant='contained'
                size='large'
                disabled={!write || isLoading}
                onClick={() => write?.()}
            >Play Lottery</ButtonStyled>
            <Box sx={{ minHeight: '20px'}}>
                {isSuccess && <div> Successfully played a ticket! Tx hash: {data?.hash} </div>}
                {isError && <div>Error: {parseError(error.message)}</div>}
            </Box>
        </>
    )
}

// =============================================================
//                        LOTTERY PAYOUT
// =============================================================
/**
 * @dev This component configures the `roundNumber` for the `LotteryPayout` component, and it is implicitly
 *      utilized by every subcomponent within the `LotteryPayout` component.
 */
export const PayoutSelectRound = ({ function: setRoundNumber, value: roundNumber }) => {  

    const miniButtonStyle = () => {
        const size = '20px';

        return {
            maxWidth: size,
            maxHeight: size,
            minWidth: size,
            minHeight: size,
            color: 'black',
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            Round Number:
            <TextField
                inputProps={{ style: { textAlign: 'center' }}}
                onChange={(v) => {
                    setRoundNumber(v.target.value);
                }}
                sx={{
                    width: 55,
                    marginLeft: '5px',
                    border: '2px solid black',
                    borderRadius: '10px'
                }}
                value={roundNumber}
                size='small'
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    sx={miniButtonStyle}
                    onClick={() =>{
                        const x = Number(roundNumber) + 1;
                        setRoundNumber(x);
                    }}
                >{'▲'}</Button>
                <Button
                    sx={miniButtonStyle}
                    onClick={() =>{
                        const x = Number(roundNumber) - 1;
                        if(x < 0) return;
                        setRoundNumber(x);
                    }}
                >{'▼'}</Button>
            </Box>
        </Box>
    );
}

/**
 * @dev This component utilizes the `roundNumber` from its parent component, fetches the drawn numbers
 *      for that specific round, and displays them in an array of text fields.
 */
export const PayoutDisplayDrawnNumbers = ({ roundNumber }) => {

    const [numbersDrawn, _setNumbersDrawn] = useState([]);

    const setNumbersDrawn = (array) => {
        const result = []

        for(const x of array)
            result.push(formatUnits(x, -1));

        _setNumbersDrawn(result);
    }

    const { isFetching, isLoading } = useContractRead({
        ...LuckySixContract,
        functionName: 'unpackResultForRound',
        args: [`${roundNumber}`],
        onSuccess(data) {
            setNumbersDrawn(data);
        },
        onError(error) {
            console.log('Error fetching drawn numbers', error);
        },
        //enabled: typeof roundNumber !== 'undefined'
    });

    return (
        <Box>
            Drawn numbers: {(isFetching || isLoading) && <CircularProgress size='16px' sx={{ color: 'black' }}/>}
            <section>
                {
                    Array.from({ length: 35 },
                    (_, i) =>
                    <TextField
                        key={i}
                        inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                        sx={{
                            width: 29,
                            border: '2px solid black',
                            borderRadius: '10px',
                            '& .MuiInputBase-input.Mui-disabled': {
                                WebkitTextFillColor: 'black',
                            }
                        }}
                        value={`${numbersDrawn[i]}`}    // TODO
                        size='small'
                        variant='standard'
                        disabled={true}
                    />
                    )
                }
            </section>
        </Box>
    )
}

/**
 * @dev This component retrieves and presents ticket information for the connected user in the specified
 *      `roundNumber` from its parent component, displaying the data in a table format.
 */
export const PayoutRedeem = ({ roundNumber }) => {

    const { address, isConnected } = useAccount();

    const [indexOfTicket, setIndexOfTicket] = useState(0);

    const [ticketsList, _setTicketsList] = useState([
        { id: 0, bet: '', combination: '', redeemed: '' },
        { id: 1, bet: '', combination: '', redeemed: '' },
        { id: 2, bet: '', combination: '', redeemed: '' },
        { id: 3, bet: '', combination: '', redeemed: '' },
        { id: 4, bet: '', combination: '', redeemed: '' }
    ]); // TODO: Remove

    /**
     * @dev This function updates the tickets list for the specified round with with given data. It's important
     *      to note that both bet and combination are represented as string values.
     */
    const setTicketsList = (data) => {
        const result = [];

        for(const [ index, ticket] of data.entries()) {
            const combination = [];

            for(let i=0; i<6; i++)
                combination.push(formatUnits(ticket.combination[i], -1));

            result.push({
                id: index, 
                bet: `${formatUnits(ticket.bet, 18)} ${currency}`,
                combination: '[' + combination.toString() + ']',
                redeemed: ticket.redeemed
            })
        }

        // TODO: Remove
        while(result.length < 5){
            result.push({ id: result.length, bet: '', combination: '', redeemed: '' })
        }

        _setTicketsList(result);
    }

    /**
     * @dev This hook automatically fetches all the tickets played by the connected address and invokes the
     *      `setTicketsList` function. It's worth noting that the hook is triggered automatically when the
     *      wallet is connected.
     */
    useContractRead({
        ...LuckySixContract,
        functionName: isConnected ? 'getTicketsForRound' : '',
        args: [`${roundNumber}`],
        onSuccess(data) {
            setTicketsList(data);
        },
        onError(error) {
            console.log('Error fetching tickets', error);
        },
        account: address
    });

    /**
     * @dev This hook is designed to invoke the `getPayoutForTicket` function from the connected address.
     */
    const { config, isError, isLoading, isFetching } = usePrepareContractWrite({
        ...LuckySixContract,
        functionName: 'getPayoutForTicket',
        args: [roundNumber, indexOfTicket],
        enabled: true,
        account: address
    });
    const { write } = useContractWrite(config);

    const handleRowClick = (dataRow) => {
        if(dataRow.row.bet === '')
            return;
        setIndexOfTicket(dataRow.row.id);
    }

    const returnItalicBox = (text) => {
        return <Box sx={{ fontStyle: 'italic' }}>{text}</Box>
    }

    const commonProperties = { sortable: false, flex: 1, headerAlign: 'center', align: 'center' };
    const columns = [
        { ...commonProperties, field: 'id', headerName: 'TicketID', maxWidth: 75 },
        { ...commonProperties, field: 'combination', headerName: 'Combination' },
        { ...commonProperties, field: 'bet', headerName: 'Bet' },
        { ...commonProperties, field: 'redeem', headerName: 'Redeem', 
            renderCell: (params) => {
                const row = params.row;

                // Return if the row is empty
                if(row.bet === '') return;

                // Display a `CircularProgress` component if the ticket status is loading
                if(isLoading || isFetching) return <CircularProgress size='16px' sx={{ color: 'black' }}/>;

                // Show the message `redeemed` if the ticket has been redeemed
                if(row.redeemed === true) return returnItalicBox('redeemed');

                // Display `not redeemable` if the ticket cannot be redeemed
                if(isError === true) return returnItalicBox('not redeemable')

                const handleRedeem = () => {
                    if(isError)
                        alert('Ticket not valid');
                    else
                        write?.()
                }
                return <Button onClick={handleRedeem} variant='contained'>Redeem</Button>;
            }
        }
    ]

    return (
        <Box sx={{ width: '100%', marginTop: '5px' }}>
            Your Tickets:
            <DataGrid
                rows={ticketsList}
                columns={columns}
                rowHeight={28}
                disableColumnMenu
                hideFooter={true}
                rowCount={columns.length}
                onRowClick={handleRowClick}
                sx={{
                    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important'
                    },
                    marginTop: '5px'
                }}
            />
        </Box>
    )
}