import { useEffect, useState } from 'react';
import { LuckySixFunctions } from '../dependencies/luckysix';
import { InputNumbers, PlayButton } from './UI';

export const Body = () => {

    const LuckySix = LuckySixFunctions();

    // Current lottery states of the Lucky Six lottery smart contract
    const [platfromFee, setPlatfromFee] = useState();
    const [roundDuration, setRoundDuration] = useState();
    const [numberOfRound, setNumberOfRound] = useState();
    const [dateStarted, setDateStarted] = useState();
    const [isStarted, setIsStarted] = useState();
    const [lotteryState, setLotteryState] = useState();

    // TODO: Desc
    const [combination, _setCombination] = useState([0,0,0,0,0,0]);

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

    }, [combination, LuckySix]);

    const testFunc = () => {
        console.log('Calling from UI.js');
    }

    return (
        <>
            <div>Platform Fee: {platfromFee} ethers</div>
            <div>Round Duration: {roundDuration} seconds</div>
            <div>Round Number: {numberOfRound}</div>
            <div>Date Started: {dateStarted}</div>
            <div>{isStarted}</div>
            <div>Lottery State: {lotteryState}</div>

            <InputNumbers function={setCombination}/>
            <PlayButton function={testFunc}/>
        </>
    )
}
