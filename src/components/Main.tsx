import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {EnterLottery} from "../hooks/hookMain"

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '580px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        paddingTop: '55px',
        width: '500px',
        height: '200px',
        backgroundColor: '#F8F8F8',
        border: '1.5px solid black'      
    },
    rowFlex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '7px',
    },
    inputNumbers: {
        width: 60,
        height: 56,
        marginLeft: '5px',
        marginRight: '5px',
        backgroundColor: '#FFFFFF',
        border: '1px solid black',  
        borderRadius: '10px',
        fontWeight: 1000
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: '5px'
    },    
}))


export const Main = () => {

    const classes = useStyles()

    const hook = EnterLottery()

    let combination : Array<Number> = [-1,-1,-1,-1,-1,-1]

    let value;

    const enterLottery = () => {
        hook._enterLottery(combination, value)
    }

    //TODO: TIMER JEL STARTOVAN ILI SE RACUNA WINNER
    //TODO: PLAY NE MOZE DA SE KLIKNE AKO NIJE VALIDAN INPUT U POLJA SA BROJEVIMA
    //TODO: VALIDAN INPUT BROJ IZMEDJU 1-48 I SVI RAZLICITI
    //TODO: POLJE ZACRVENI AKO NIJE VALIDAN INPUT
    return(
        <div className={classes.wrapper}>
            <Box className={classes.box}>
                <Box component="form" className={classes.rowFlex}>
                <section>
                    {Array.from({ length: 6 }, 
                    (_, i) => 
                    <TextField
                        key={i}
                        className={classes.inputNumbers} 
                        onChange={(v) => combination[i] = Number(v.target.value)}
                        inputProps={{min: 0, style: { textAlign:'center'}}}
                        variant="outlined"
                    />
                    )}
                </section>
                </Box>
                <Box className={classes.rowFlex}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} onChange={(v) => value = v.target.value}>
                        BLA BLA
                    </TextField>
                </Box>
                <Box className={classes.rowFlex}>
                    <Button variant="outlined" size="large" onClick={enterLottery} className={classes.button}>
                        Play
                    </Button>
                </Box>
            </Box>
        </div>
    )
}