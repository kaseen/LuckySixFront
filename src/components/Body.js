import { useEffect, useState } from 'react';
import { LuckySixFunctions } from '../dependencies/luckysix';
import { EtherField, InputNumbers, PlayLottery } from './UI';

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
        <>
            <div>Platform Fee: {platfromFee} ethers</div>
            <div>Round Duration: {roundDuration} seconds</div>
            <div>Round Number: {numberOfRound}</div>
            <div>Date Started: {dateStarted}</div>
            <div>{isStarted}</div>
            <div>Lottery State: {lotteryState}</div>

            <InputNumbers function={setCombination}/>
            <EtherField function={setAmountToPlay} platfromFee={platfromFee}/>
            <PlayLottery combination={combination} amountToPlay={amountToPlay}/>
        </>
    )
}
