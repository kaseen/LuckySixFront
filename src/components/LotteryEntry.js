import { useState } from 'react';
import { Box } from '@mui/material';
import { 
    EntryDisplayInfo,
    EntryEtherField,
    EntryInputNumbers,
    EntryPlayLottery,
    bodyContainerStyle,
    Test
} from './UI';

export const LotteryEntry = () => {

    // Values of ticket attributes that a user wants to play, with default values set to 0
    const [combination, _setCombination] = useState(['1','2','3','4','5','6']);
    const [amountToPlay, setAmountToPlay] = useState('0.02');
    const [render, setRender] = useState(0);

    const setCombination = (i, v) => {
        const tmpCombination = combination;
        tmpCombination[i] = v;
        _setCombination(tmpCombination);

        render === 0 ? setRender(1) : setRender(0); // TODO
    }

    return (
        <Box sx={bodyContainerStyle}>
            <EntryDisplayInfo/>
        </Box>
    )
}

/*
<EntryDisplayInfo networkId={networkId}/>
<EntryInputNumbers function={setCombination}/>
<EntryEtherField function={setAmountToPlay}/>
<EntryPlayLottery combination={combination} amountToPlay={amountToPlay}/>
*/