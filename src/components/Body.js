import { useEffect, useState } from 'react';
import { LuckySixFunctions } from '../dependencies/luckysix';
import { EtherField, InputNumbers, PlayLottery } from './UI';
import { Box } from '@mui/material';

export const Body = () => {

    const LuckySix = LuckySixFunctions();

    // Current lottery states of the Lucky Six lottery smart contract
    const [platfromFee, setPlatfromFee] = useState();
    const [roundDuration, setRoundDuration] = useState();
    const [numberOfRound, setNumberOfRound] = useState();
    const [dateStarted, setDateStarted] = useState();
    const [isStarted, setIsStarted] = useState();
    const [lotteryState, setLotteryState] = useState();

    // Values of ticket attributes that a user wants to play, with default values set to 0
    const [combination, _setCombination] = useState([1,2,3,4,5,6]);
    const [amountToPlay, setAmountToPlay] = useState(0.02);

    const setCombination = (i, v) => {
        const tmpCombination = combination;
        tmpCombination[i] = v;
        _setCombination(tmpCombination);
    }

    useEffect(() => {
        const result = LuckySix.readPlatfromStates();

        setPlatfromFee(result.platfromFee);
        setRoundDuration(result.roundDuration);
        setNumberOfRound(result.numberOfRound);
        setDateStarted(result.dateStarted.toString());
        setIsStarted(result.isStarted);
        setLotteryState(result.lotteryState);

    }, [combination, amountToPlay, LuckySix]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Ubuntu',

            background: 'linear-gradient(120deg, #020024 0%, #090979 0%, #00d4ff 60%)',
            borderRadius: '20px',
            border: '4px solid black',

            // Centering
            position: 'absolute',
            left: '35%',
            right: '35%',
            maxWidth: '30%',
            marginTop: '120px',
            padding: '10px',
        }}>

            <div>Platform Fee: {platfromFee} ethers</div>
            <div>Round Duration: {roundDuration} seconds</div>
            <div>Round Number: {numberOfRound}</div>
            <div>Date Started: {dateStarted}</div>
            <div>{isStarted}</div>
            <div>Lottery State: {lotteryState}</div>

            <InputNumbers function={setCombination}/>
            <EtherField function={setAmountToPlay} platfromFee={platfromFee}/>
            <PlayLottery combination={combination} amountToPlay={amountToPlay}/>
        </Box>
    )
}
