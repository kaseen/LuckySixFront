import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {EnterLottery} from "../hooks/hookMain"
import {OnlyOwner} from "../hooks/hookOnlyOwner"
import {useEffect, useState} from "react"

const useStyles = makeStyles(() => ({
    wrapper: {
        height: '580px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timer: {
        height: '50px',
        backgroundColor: 'yellow'
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

    const hookEnterLottery = EnterLottery()
    const hookOnlyOwner = OnlyOwner()

    const [drawnNumbers, setDrawnNumbers] = useState("")
    const [value, setValue] = useState("")
    const [render, setRender] = useState(true)
    const [combination, setCombination] = useState([-1,-1,-1,-1,-1,-1])

    const enterLottery = () => {
        hookEnterLottery._enterLottery(combination, value)
    }

    const _setCombination = (i,v) => {
        const tmp = combination
        tmp[i] = v
        setCombination(tmp)
    }

    async function showNumbers(){
        const x = await hookOnlyOwner._getDrawnNumbers()
        var string = ""
        for (let index = 0; index < 35; index++) {
            string += (x[index].toNumber()).toString() + " "
        }
        setDrawnNumbers(string)
    }

    useEffect(() => {
        showNumbers()
        setRender(true)
    }, [render]);

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
                        onChange={(v) => _setCombination(i, Number(v.target.value))}
                        inputProps={{min: 0, style: { textAlign:'center'}}}
                        variant="outlined"
                    />
                    )}
                </section>
                </Box>
                <Box className={classes.rowFlex}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center' }}} onChange={(v) => setValue(v.target.value)}>
                        BLA BLA
                    </TextField>
                </Box>
                <Box className={classes.rowFlex}>
                    <Button variant="outlined" size="large" onClick={enterLottery} className={classes.button}>
                        Play
                    </Button>
                </Box>
            </Box>
            <h1 className={classes.timer}>
                <div>
                {drawnNumbers}
                </div>
                <Button onClick={showNumbers}>LGALG</Button>
            </h1>
        </div>
    )
}