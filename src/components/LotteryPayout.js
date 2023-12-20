import { Box, Button, TextField } from '@mui/material';
import { bodyContainerStyle, ReadRoundNumber, DisplayDrawnNumbers } from './UI';
import { useState } from 'react';

export const LotteryPayout = () => {

    const [roundNumber, setRoundNumber] = useState(0);  //TODO
    

    return (
        <Box sx={bodyContainerStyle}>
            <ReadRoundNumber
                function={setRoundNumber}
                value={roundNumber}
            />

            <DisplayDrawnNumbers
                roundNumber={roundNumber}
            />

            <Box>
                drawnNumbers:
                <TextField></TextField>
            </Box>
            <Box>
                tickets:
                <TextField></TextField>
            </Box>
            <Box><TextField></TextField> <Button>Redeem</Button></Box>
        </Box>
    )
}