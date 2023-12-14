import { useEffect, useState } from 'react';
import { LuckySixFunctions } from '../dependencies/luckysix';

export const Body = () => {

    const LuckySix = LuckySixFunctions();

    // Current lottery states of the Lucky Six lottery smart contract
    const [platfromFee, setPlatfromFee] = useState();
    const [roundDuration, setRoundDuration] = useState();
    const [numberOfRound, setNumberOfRound] = useState();
    const [dateStarted, setDateStarted] = useState();
    const [isStarted, setIsStarted] = useState();
    const [lotteryState, setLotteryState] = useState();

    useEffect(() => {
        const result = LuckySix.readPlatfromStates();

        setPlatfromFee(result.platfromFee);
        setRoundDuration(result.roundDuration);
        setNumberOfRound(result.numberOfRound);
        setDateStarted(result.dateStarted.toString());
        setIsStarted(result.isStarted);
        setLotteryState(result.lotteryState);
    }, [LuckySix]);

    return (
        <>
            <div>Platform Fee: {platfromFee} ethers</div>
            <div>Round Duration: {roundDuration} seconds</div>
            <div>Round Number: {numberOfRound}</div>
            <div>Date Started: {dateStarted}</div>
            <div>{isStarted}</div>
            <div>Lottery State: {lotteryState}</div>
        </>
    )
}
