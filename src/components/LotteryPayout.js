import { Box, Button, TextField } from '@mui/material';
import { bodyContainerStyle } from './UI';

export const LotteryPayout = () => {

    return (
        <Box sx={bodyContainerStyle}>
            <Box>Round: <TextField></TextField></Box>
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