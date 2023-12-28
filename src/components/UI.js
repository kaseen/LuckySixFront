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
import { Contracts } from '../dependencies/contracts'
import LuckySixABI from '../dependencies/abi.json';

/**
 * @dev This function, given the `chain` as an argument, returns the lottery info on that chain.
 */
const getContractInfo = (chain) => {
    if(chain === undefined)
        return ''
    if(Contracts(chain.id) === undefined)
        return ''
    return Contracts(chain.id);
}

/**
 * @dev The styling for the primary component, which is revealed through routing, centers the component in
 *      the middle of the screen. The margins on the sides are precisely calculated as (window.innerWidth - width)/2.
 */
const drawnNumbersWidth = 180;
const ticketsWidth = 450;
const ticketsHeight = 260;

export const bodyContainerStyle = () => {

    const width = drawnNumbersWidth + ticketsWidth;
    const height = ticketsHeight + 90;
    const padding = '10px';
    const sides = `${(window.innerWidth - width)/2}px`

    return {
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
        minHeight: `${height}px`,
        maxHeight: `${height}px`,
        padding: padding,
        left: sides,
        right: sides,

        position: 'absolute',
        marginTop: '40px',

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
//                        LOTTERY BALANCE
// ============================================================= 

export const DisplayLotteryBalance = () => {

    const { chain } = useNetwork();
    const contractInfo = getContractInfo(chain);

    const [platformBalance, setPlatfromBalance] = useState();

    const { isFetching, isLoading } = useContractRead({
        address: contractInfo.address,
        abi: LuckySixABI,
        functionName: 'platformBalance',
        onSuccess(data) {
            setPlatfromBalance(formatUnits(data, 18))
        },
        onError(error) {
            console.log('Error getting platform balance', error);
        },
        enabled: chain !== undefined,
        watch: true
    });

    const BoxStyled = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '35px',
        minHeight: '100px',
        maxHeight: '100px',
        fontFamily: 'Ubuntu',
        fontSize: '40px'
    });

    if(chain === undefined)
        return <BoxStyled/>
    else if(Contracts(chain.id) === undefined)
        return <BoxStyled/>

    return (
        <BoxStyled>
            <div>
                Stand a chance to win up to {
                isFetching || isLoading ?
                <CircularProgress size='35px' sx={{ color: 'black' }}/> : `${platformBalance} ${contractInfo.currency}`}
            </div>
            <div>based on the current lottery balance</div>
        </BoxStyled>
    )
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
    const contractInfo = getContractInfo(chain);

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
                address: contractInfo.address,
                abi: LuckySixABI,
                functionName: 'platformFee',        // Index 0
            },
            {
                address: contractInfo.address,
                abi: LuckySixABI,
                functionName: 'roundDuration',      // Index 1
            },
            {
                address: contractInfo.address,
                abi: LuckySixABI,
                functionName: 'roundInfo',          // Index 2
            },
            {
                address: contractInfo.address,
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
            <Box sx={{ width: '50%' }}>
                <Box>Platform fee: {showInfoOrProgress(platfromFee, `${platfromFee} ${contractInfo.currency}`)}</Box>
                <Box>Round Number: {showInfoOrProgress(numberOfRound, `${numberOfRound}`)}</Box>
            </Box>

            <Box sx={{ width: '50%' }}>
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
                        width: 60,
                        height: 56,
                        marginLeft: '5px',
                        marginRight: '5px',
                        border: '2px solid black',
                        borderRadius: '10px'
                    }}
                    //placeholder={`${i+1}`}
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
                //marginTop: '15px'
            }}
            helperText='value you want to play (fees included)'
            //placeholder='0.02'
        />
    )
}

/**
 * @dev This component participates in the lottery using the `combinatio`n and `amountToPlay` variables
 *      inherited from the parent component. It's worth noting that the button is only clickable when the
 *      wallet is connected. Additionally, the button is disabled during the transaction pending phase,
 *      displaying the transaction hash upon success. In case of an error, an error message is presented.
 */
export const EntryPlayLottery = ({ combination, amountToPlay, validInput }) => {

    const { chain } = useNetwork();
    const contractInfo = getContractInfo(chain);

    const { config, error, isError } = usePrepareContractWrite({
        address: contractInfo.address,
        abi: LuckySixABI,
        functionName: 'playTicket',
        args: [combination],
        value: parseUnits(`${amountToPlay}`, 18),
        enabled: validInput
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
                        if(roundNumber !== ''){
                            const x = Number(roundNumber) + 1;
                            setRoundNumber(x);
                        }
                        else
                            setRoundNumber(0);
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
export const PayoutDisplayDrawnNumbers = ({ roundNumber, ticketInfo }) => {

    const { chain } = useNetwork();
    const contractInfo = getContractInfo(chain);
    const emptyCells = Array(35).fill('');

    const [numbersDrawn, _setNumbersDrawn] = useState(emptyCells);

    const setNumbersDrawn = (array) => {
        // If the numbers for the specified round are not drawn, populate the cells with empty values.
        if(formatUnits(array[0], -1) === '0'){
            _setNumbersDrawn(emptyCells);
            return;
        }

        const drawnNumbers = [];

        for(const x of array)
            drawnNumbers.push(formatUnits(x, -1));

        _setNumbersDrawn(drawnNumbers);
    }

    /**
     * @dev This hook fetches the drawn numbers for the specified `roundNumber`, and it is activated when
     *      when the provided `roundNumber` is defined.
     */
    const { isFetching, isLoading } = useContractRead({
        address: contractInfo.address,
        abi: LuckySixABI,
        functionName: 'unpackResultForRound',
        args: [`${roundNumber}`],
        onSuccess(data) {
            setNumbersDrawn(data);
        },
        onError(error) {
            console.log('Error fetching drawn numbers', error);
        },
        enabled: roundNumber !== ''
    });

    /**
     * @dev This function compares each ticket number with the value of the text field specified by the `row` and
     *      `col`, highlighting it in a different color if there is a match.
     */
    const getValue = (row, col) => {
        if(ticketInfo === undefined)
            return '';
        for(let i=0; i<6; i++)
            if(Number(numbersDrawn[row * numBoxes + col]) === ticketInfo[i])
                return '#a8e0ff';
        return '';
    }

    const numRows = 7;
    const numBoxes = 5;

    /**
     * @dev Produces a matrix of text fields with dimensions `numRows` by `numBoxes`. Each text field is uniquely
     *      identified with a key in the format `${row}-${col}`, and the value within each box is computed from
     *      the formula `numbersDrawn[row * numBoxes + col]`.
     */
    return (
        <Box sx={{
            minWidth: `${drawnNumbersWidth}px`,
            maxWidth: `${drawnNumbersWidth}px`,
            marginTop: '5px'
        }}>
            Drawn numbers: {(isFetching || isLoading) && <CircularProgress size='16px' sx={{ color: 'black' }}/>}
            <section>
                {
                Array.from({ length: numRows }).map((_, row) => (
                    <Box key={row} sx={{marginTop: '5px'}}>
                        {Array.from({ length: numBoxes }).map((_, col) => (
                        <TextField
                            key={`${row}-${col}`}
                            inputProps={{ style: { textAlign: 'center', color: 'white' } }}
                            sx={{
                                width: 29,
                                border: '2px solid black',
                                borderRadius: '10px',
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: 'black',
                                },
                                background: getValue(row, col)
                            }}
                            value={`${numbersDrawn[row * numBoxes + col]}`}
                            size='small'
                            variant='standard'
                            disabled={true}
                        />
                        ))}
                    </Box>
                ))
                }
            </section>
        </Box>
    )
}

/**
 * @dev This component retrieves and presents ticket information for the connected user in the specified
 *      `roundNumber` from its parent component, displaying the data in a table format.
 */
export const PayoutRedeem = ({ roundNumber, setTicketInfo, indexOfTicket, setIndexOfTicket }) => {

    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();
    const contractInfo = getContractInfo(chain);

    const onClickBackground = indexOfTicket !== '' ? 
        'linear-gradient(300deg, #020024 0%, #090979 10%, #00d4ff 100%) !important' : '';

    const [ticketsList, _setTicketsList] = useState([
        { id: 0, bet: '', combination: '', redeemed: '' },
        { id: 1, bet: '', combination: '', redeemed: '' },
        { id: 2, bet: '', combination: '', redeemed: '' },
        { id: 3, bet: '', combination: '', redeemed: '' },
        { id: 4, bet: '', combination: '', redeemed: '' },
        { id: 5, bet: '', combination: '', redeemed: '' },
        { id: 6, bet: '', combination: '', redeemed: '' }
    ]); // TODO: Remove

    /**
     * @dev This function updates the tickets list for the specified round with with given data. It's important
     *      to note that both bet and combination are represented as string values.
     */
    const setTicketsList = (data) => {
        if(data.length < indexOfTicket)
            setIndexOfTicket('');

        const result = [];

        for(const [ index, ticket] of data.entries()) {
            const combination = [];

            for(let i=0; i<6; i++)
                combination.push(formatUnits(ticket.combination[i], -1));

            result.push({
                id: index, 
                bet: `${formatUnits(ticket.bet, 18)} ${contractInfo.currency}`,
                combination: '[' + combination.toString() + ']',
                redeemed: ticket.redeemed
            })
        }

        // TODO: Remove
        while(result.length < 7){
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
        address: contractInfo.address,
        abi: LuckySixABI,
        functionName: isConnected ? 'getTicketsForRound' : '',
        args: [`${roundNumber}`],
        onSuccess(data) {
            setTicketsList(data);
        },
        onError(error) {
            console.log('Error fetching tickets', error);
        },
        account: address,
        enabled: roundNumber !== ''
    });

    /**
     * @dev This hook is designed to invoke the `getPayoutForTicket` function from the connected address.
     */
    const { config, isError, isLoading, isFetching } = usePrepareContractWrite({
        address: contractInfo.address,
        abi: LuckySixABI,
        functionName: 'getPayoutForTicket',
        args: [roundNumber, indexOfTicket !== undefined ? indexOfTicket : 0],
        enabled: roundNumber !== '' && indexOfTicket !== '' && ticketsList[indexOfTicket].id !== '',
        account: address
    });
    const { data, write } = useContractWrite(config);
    
    const { isLoading: isLoading2, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    });

    const returnItalicBox = (text) => {
        return <Box sx={{ fontStyle: 'italic', color: 'white' }}>{text}</Box>
    }

    const commonProperties = { sortable: false, flex: 1, headerAlign: 'center', align: 'center' };
    const columns = [
        { ...commonProperties, field: 'id', headerName: 'ID', maxWidth: 40 },
        { ...commonProperties, field: 'combination', headerName: 'Combination', minWidth: 140 },
        { ...commonProperties, field: 'bet', headerName: 'Bet' },
        { ...commonProperties, field: 'redeem', headerName: '', maxWidth: 110, 
            renderCell: (params) => {
                const row = params.row;

                // Return if the row is empty
                if(row.bet === '') return;

                // Return if the row is not selected
                if(indexOfTicket !== row.id) return;

                // Display a `CircularProgress` component if the ticket status is loading
                if(isLoading || isLoading2 || isFetching) return <CircularProgress size='16px' sx={{ color: 'black' }}/>;

                // Show the message `redeemed` if the ticket has been redeemed
                if(row.redeemed === true || isSuccess === true) return returnItalicBox('redeemed');
            
                // Display `not redeemable` if the ticket cannot be redeemed
                if(isError === true) return returnItalicBox('not redeemable');

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
        <Box sx={{
            minWidth: `${ticketsWidth}px`,
            maxWidth: `${ticketsWidth}px`,
            height: `${ticketsHeight}px`,
            marginTop: '5px'
        }}>
            Ticket details, click to reveal:
            <DataGrid
                rows={ticketsList}
                columns={columns}
                rowHeight={28}
                disableColumnMenu
                hideFooter={true}
                count={ticketsList.length}
                onRowClick={dataRow => {
                    setIndexOfTicket(dataRow.row.id);
                    if(dataRow.row.bet !== '')
                        setTicketInfo(JSON.parse(dataRow.row.combination))
                    else
                        setTicketInfo()
                }}
                sx={{
                    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important'
                    },
                    '&.MuiDataGrid-root .Mui-selected': {
                        background: onClickBackground,
                    },
                    '&.MuiDataGrid-root': {
                        border: '3px solid black'
                    },
                    marginTop: '5px'
                }}
            />
        </Box>
    )
}