import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react';
import { styled } from '@mui/system';

import {
    useContractRead,
    useContractReads,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useAccount,
    useNetwork
} from 'wagmi';

import { formatUnits, parseUnits } from 'viem';
import LuckySixABI from '../abi.json';
import { Contracts } from '../dependencies/contracts'

// TODO
const currency = 'ETH'

/**
 * @dev This function, given the `chain` as an argument, returns the lottery address if the lottery exists
 *      on that chain.
 */
const getContractAddress = (chain) => {
    if(chain === undefined)
        return ''
    if(Contracts(chain.id) === undefined)
        return ''
    return Contracts(chain.id).address;
}

/**
 * @dev The styling for the primary component, which is revealed through routing, centers the component in
 *      the middle of the screen. The margins on the sides are precisely calculated as (100% - width)/2.
 */
export const bodyContainerStyle = () => {

    const width = '32%';
    const height = '42%';
    const padding = '10px';
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

        background: 'linear-gradient(300deg, #020024 0%, #090979 0%, #00d4ff 60%)',
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
 * @dev This component checks the current connection status. In case of an error, it displays an error message.
 *      If everything is correct, it shows the state of the lottery on the connected network, presenting information
 *      such as the current platform fee, round number, lottery status, and the start time if the lottery has begun.
 */
export const EntryDisplayInfo = () => {

    const { chain } = useNetwork();
    const contractAddress = getContractAddress(chain);

    const [platfromFee, setPlatfromFee] = useState();
    const [numberOfRound, setNumberOfRound] = useState();
    const [lotteryState, setLotteryState] = useState();
    const [dateStarted, setDateStarted] = useState();

    /**
     * @dev The lottery states are defined in `github.com/kaseen/LuckySix/src/interfaces/ILuckySix.sol`.
     */
    const LOTTERY_STATE = {
        0: 'Ready',
        1: 'Started',
        2: 'Calculating',
        3: 'Drawing',
        4: 'Closed'
    }

    /**
     * @dev This hooks reads the current lottery states and returns them to the body to be rendered.
     */
    useContractReads({
        contracts: [
            {
                address: contractAddress,
                abi: LuckySixABI,
                functionName: 'platformFee',        // Index 0
            },
            {
                address: contractAddress,
                abi: LuckySixABI,
                functionName: 'roundDuration',      // Index 1
            },
            {
                address: contractAddress,
                abi: LuckySixABI,
                functionName: 'roundInfo',          // Index 2
            },
            {
                address: contractAddress,
                abi: LuckySixABI,
                functionName: 'lotteryState',       // Index 3
            }
        ],
        onSuccess(data) {
            const roundDuration = formatUnits(data[1].result, -1);
            const startedTimestamp = formatUnits(data[2].result[1], -1);

            setPlatfromFee(formatUnits(data[0].result, 18));
            setNumberOfRound(formatUnits(data[2].result[0], -1));
            setLotteryState(formatUnits(data[3].result, -1));

            const dateStarted = new Date((Number(startedTimestamp) + Number(roundDuration)) * 1000);
            const formatter = new Intl.DateTimeFormat(
                'en-GB', {
                    /*day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',*/
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: 'h23'
                });

            setDateStarted(formatter.format(dateStarted));
        },
        watch: true
    });

    const boxStyle = () => {
        return {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '8px',
            fontSize: '18px',
            borderBottom: '3px solid black',
            height: '50px'
        }
    }

    const errorStyle = () => {
        const parentStyle = boxStyle();
        parentStyle.display = 'flex';
        parentStyle.justifyContent = 'center';
        parentStyle.alignItems = 'center';
        parentStyle.fontSize = '20px';

        return parentStyle;
    }

    const miniBoxStyle = () => {
        return {
            width: '50%',
            paddingBottom: '8px'
        }
    }

    const showInfoOrProgress = (variable, textOnSuccess) => {
        return typeof variable !== 'undefined' ? textOnSuccess : <CircularProgress size='16px' sx={{ color: 'black' }}/>
    }

    /**
     * @dev If the wallet is not connected, display the first message. If the lottery does not exist on
     *      the connected chain, show the second message.
     */
    if(chain === undefined)
        return <Box sx={errorStyle}>
            Please connect to the network to view the lottery state!
        </Box>
    else if(Contracts(chain.id) === undefined)
        return <Box sx={errorStyle}>
            Lottery doesn't exist on this network!
        </Box>

    return (
        <Box sx={boxStyle}>
            <Box sx={miniBoxStyle}>
                <Box>Platform fee: {showInfoOrProgress(platfromFee, `${platfromFee} ${currency}`)}</Box>
                <Box>Round Number: {showInfoOrProgress(numberOfRound, `${numberOfRound}`)}</Box>
            </Box>

            <Box sx={miniBoxStyle}>
                <Box>Lottery State: {showInfoOrProgress(lotteryState, `${LOTTERY_STATE[lotteryState]}`)}</Box>
                <Box>Round ends: {showInfoOrProgress(lotteryState, 
                    LOTTERY_STATE[lotteryState] === 'Started' ? `${dateStarted}` : ''
                )}</Box>
            </Box>
        </Box>
    )
}
/**
 * @dev This component generates an array of 6 text fields, each with a distinct identifier. It updates
 *      the `combination` variable from the parent component using a function passed as a prop. The function
 *      modifies the state of the array whenever there is a change in any of those fields.
 */
export const EntryInputNumbers = ({ function: setCombination }) => {
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
export const EntryEtherField = ({ function: setAmountToPlay }) => {
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
 * @dev This component participates in the lottery using the `combinatio`n and `amountToPlay` variables
 *      inherited from the parent component. It's worth noting that the button is only clickable when the
 *      wallet is connected. Additionally, the button is disabled during the transaction pending phase,
 *      displaying the transaction hash upon success. In case of an error, an error message is presented.
 */
export const EntryPlayLottery = ({ combination, amountToPlay }) => {

    const { chain } = useNetwork();
    const contractAddress = getContractAddress(chain);

    const { config, error, isError } = usePrepareContractWrite({
        address: contractAddress,
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
        marginBottom: '10px',
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
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100px'
        }}>
            <ButtonStyled
                variant='contained'
                size='large'
                disabled={!write || isLoading}
                onClick={() => write?.()}
            >Play Lottery</ButtonStyled>
            <Box>
                {isSuccess && <div> Successfully played a ticket! Tx hash: {data?.hash} </div>}
                {isError && <div>Error: {parseError(error.message)}</div>}
            </Box>
        </Box>
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

    const { chain } = useNetwork();
    const contractAddress = getContractAddress(chain);

    const [numbersDrawn, _setNumbersDrawn] = useState([]);

    const setNumbersDrawn = (array) => {
        const result = []

        for(const x of array)
            result.push(formatUnits(x, -1));

        _setNumbersDrawn(result);
    }

    const { isFetching, isLoading } = useContractRead({
        address: contractAddress,
        abi: LuckySixABI,
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
    const { chain } = useNetwork();
    const contractAddress = getContractAddress(chain);

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
        address: contractAddress,
        abi: LuckySixABI,
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
        address: contractAddress,
        abi: LuckySixABI,
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