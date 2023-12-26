import { Box } from '@mui/material';
import { useState } from 'react';
import { 
    PayoutSelectRound,
    PayoutDisplayDrawnNumbers,
    PayoutRedeem,
    bodyContainerStyle
} from './UI';

export const LotteryPayout = () => {

    const [roundNumber, setRoundNumber] = useState('');

    return (
        <Box sx={bodyContainerStyle}>
            <PayoutSelectRound function={setRoundNumber} value={roundNumber}/>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <PayoutDisplayDrawnNumbers roundNumber={roundNumber}/>
                <PayoutRedeem roundNumber={roundNumber}/>
            </Box>
        </Box>
    )
}