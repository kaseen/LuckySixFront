import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { 
    EntryDisplayInfo,
    EntryEtherField,
    EntryInputNumbers,
    EntryPlayLottery,
    bodyContainerStyle
} from './UI';

export const LotteryEntry = () => {

    // Values of ticket attributes that a user wants to play, with default values set to 0
    const [combination, _setCombination] = useState(['','','','','','']);
    const [amountToPlay, setAmountToPlay] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [render, setRender] = useState(0);

    /**
     * @dev A function verifying the completion of all fields, allowing the lottery to proceed.
     *      In case of an error, it displays the error message below the `Play Lottery` button.
     */
    const check = () => {
        for(let i=0; i<6; i++)
            if(combination[i] === '')
                return false;
        if(amountToPlay === '')
            return false;
        return true;
    }

    const setCombination = (i, v) => {
        const tmpCombination = combination;
        tmpCombination[i] = v;
        _setCombination(tmpCombination);

        render === 0 ? setRender(1) : setRender(0);
    }

    useEffect(() => {
        setValidInput(check());
        // eslint-disable-next-line
    }, [render, amountToPlay]);

    return (
        <Box sx={bodyContainerStyle}>
            <EntryDisplayInfo/>
            <EntryInputNumbers function={setCombination}/>
            <EntryEtherField function={setAmountToPlay}/>
            <EntryPlayLottery combination={combination} amountToPlay={amountToPlay} validInput={validInput}/>
        </Box>
    )
}