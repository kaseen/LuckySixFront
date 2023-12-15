import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const InputNumbers = (props) => {

    const NumberInput = styled(TextField)({
        width: 60,
        height: 56,
        marginLeft: '5px',
        marginRight: '5px',
        backgroundColor: '#FFFFFF',
        border: '1px solid black',
        borderRadius: '10px'
    });
    
    /**
     * @dev Creating an array of 6 text fields, each with a unique identifier, where the `combination`
     *      variable from `Body.js` is updated with a function passed as a prop. This function changes
     *      the state of an array on any change in those fields.
     */
    return (
        <section>
            {
                Array.from({ length: 6 },
                (_, i) =>
                <NumberInput
                    key={i}
                    onChange={(v) => {
                        props.function(i, v.target.value)
                    }}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                />
                )
            }
        </section>
    )

}

export const PlayButton = (props) => {

    const ButtonStyled = styled(Button)({
       backgroundColor: '#FFFFFF',
       borderRadius: '5px' 
    });

    return (
        <ButtonStyled
            variant='outlined'
            size='large'
            onClick={props.function}
        >Play Lottery</ButtonStyled>
    )
}