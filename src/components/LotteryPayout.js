import { Box } from '@mui/material';
import { useState } from 'react';
import { 
    PayoutSelectRound,
    PayoutDisplayDrawnNumbers,
    PayoutRedeem,
    bodyContainerStyle
} from './UI';

export const LotteryPayout = () => {

    const [roundNumber, setRoundNumber] = useState(0);  //TODO

    return (
        <Box sx={bodyContainerStyle}>
            <PayoutSelectRound function={setRoundNumber} value={roundNumber}/>
            <PayoutDisplayDrawnNumbers roundNumber={roundNumber}/>
            <PayoutRedeem roundNumber={roundNumber}/>
        </Box>
    )
}