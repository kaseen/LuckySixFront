import { useEffect, useState } from 'react';
import { LuckySixFunctions } from '../dependencies/luckysix';
import { EtherField, InputNumbers, PlayLottery, bodyContainerStyle } from './UI';
import { Box } from '@mui/material';

export const LotteryEntry = () => {

    const LuckySix = LuckySixFunctions();

    // Current lottery states of the Lucky Six lottery smart contract
    const [platfromFee, setPlatfromFee] = useState();
    const [roundDuration, setRoundDuration] = useState();
    const [numberOfRound, setNumberOfRound] = useState();
    const [dateStarted, setDateStarted] = useState();
    const [isStarted, setIsStarted] = useState();
    const [lotteryState, setLotteryState] = useState();

    // Values of ticket attributes that a user wants to play, with default values set to 0
    const [combination, _setCombination] = useState(['1','2','3','4','5','6']);
    const [amountToPlay, setAmountToPlay] = useState('0.02');
    const [render, setRender] = useState(0);

    const setCombination = (i, v) => {
        const tmpCombination = combination;
        tmpCombination[i] = v;
        _setCombination(tmpCombination);

        render === 0 ? setRender(1) : setRender(0);
    }

    useEffect(() => {
        try {
            const result = LuckySix.readPlatfromStates();

            setPlatfromFee(result.platfromFee);
            setRoundDuration(result.roundDuration);
            setNumberOfRound(result.numberOfRound);
            setDateStarted(result.dateStarted.toString());
            setIsStarted(result.isStarted);
            setLotteryState(result.lotteryState);
        } catch (e) {
            console.log('Error loading platform states');
        }

    }, [render, amountToPlay, LuckySix]);

    return (
        <Box sx={bodyContainerStyle}>
            <div>Platform Fee: {platfromFee} ethers</div>
            <div>Round Duration: {roundDuration} seconds</div>
            <div>Round Number: {numberOfRound}</div>
            <div>Date Started: {dateStarted}</div>
            <div>{isStarted}</div>
            <div>Lottery State: {lotteryState}</div>

            <InputNumbers function={setCombination}/>
            <EtherField function={setAmountToPlay}/>
            <PlayLottery combination={combination} amountToPlay={amountToPlay}/>
        </Box>
    )
}
