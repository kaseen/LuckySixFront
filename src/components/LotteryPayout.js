import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { 
    PayoutSelectRound,
    PayoutDisplayDrawnNumbers,
    PayoutRedeem,
    bodyContainerStyle
} from './UI';

export const LotteryPayout = () => {

    const [roundNumber, setRoundNumber] = useState('');
    const [ticketInfo, setTicketInfo] = useState();
    const [indexOfTicket, setIndexOfTicket] = useState('');

    useEffect(() => {
        setTicketInfo();
        setIndexOfTicket('')
    }, [roundNumber]);

    return (
        <Box sx={bodyContainerStyle}>
            <PayoutSelectRound function={setRoundNumber} value={roundNumber}/>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <PayoutDisplayDrawnNumbers roundNumber={roundNumber} ticketInfo={ticketInfo}/>
                <PayoutRedeem
                    roundNumber={roundNumber}
                    setTicketInfo={setTicketInfo}
                    indexOfTicket={indexOfTicket}
                    setIndexOfTicket={setIndexOfTicket}    
                />
            </Box>
        </Box>
    )
}