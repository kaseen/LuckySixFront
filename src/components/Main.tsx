import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {PublicFunctions} from "../hooks/hookMain"
import {useEffect, useState} from "react"

const useStyles = makeStyles(() => ({
    wrapper: {
        paddingBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        fontSize: '50px'
    },
    box: {
        paddingTop: '55px',
        borderRadius: '10px',
        width: '500px',
        height: '270px',
        backgroundColor: '#F8F8F8',
        border: '1.5px solid black',
        paddingBottom: '10px',
        marginBottom: '40px'    
    },
    rowFlex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '35px'
    },
    timer: {
        height: '35px',
        backgroundColor: 'white'
    },
    inputNumbers: {
        width: 60,
        height: 56,
        marginLeft: '5px',
        marginRight: '5px',
        backgroundColor: '#FFFFFF',
        border: '1px solid black',  
        borderRadius: '10px',
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: '5px'
    },    
}))


export const Main = () => {

    const classes = useStyles()

    const hook = PublicFunctions()

    const [drawnNumbers, setDrawnNumbers] = useState("")
    const [value, setValue] = useState("")
    const [render, setRender] = useState(true)
    const [combination, setCombination] = useState([-1,-1,-1,-1,-1,-1])
    const [state, setState] = useState("")

    const enterLottery = () => {
        hook._enterLottery(combination, value)
    }

    const _setCombination = (i,v) => {
        const tmp = combination
        tmp[i] = v
        setCombination(tmp)
    }

    async function showNumbers(){
        const x = await hook._getDrawnNumbers()
        if(x.length !== 0){
            var string = ""
            for (let index = 0; index < 35; index++) {
                string += (x[index].toNumber()).toString() + " "
            }
            setDrawnNumbers(string)
        }
    }

    async function showState() {
        const x = await hook._getState()
        switch(x){
            case 0: 
                setState("OPEN")
                break
            case 1: 
                setState("CLOSED")
                break
            case 2:
                setState("CALCULATING WINNER")
                break
        }
    }

    //TODO: NE RENDERUJE KAKO TREBA
    useEffect(() => {
        showNumbers()
        showState()
        setRender(true)
    }, [render]);

    //TODO: TIMER JEL STARTOVAN ILI SE RACUNA WINNER
    //TODO: PLAY NE MOZE DA SE KLIKNE AKO NIJE VALIDAN INPUT U POLJA SA BROJEVIMA
    //TODO: VALIDAN INPUT BROJ IZMEDJU 1-48 I SVI RAZLICITI
    //TODO: POLJE ZACRVENI AKO NIJE VALIDAN INPUT
    return(
        <div className={classes.wrapper}>
            <h2 className={classes.h1}>
                Lucky Six 
            </h2>
            <Box className={classes.box}>
                <Box className={classes.rowFlex}>
                    State: {state}
                </Box>
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
            </h1>
        </div>
    )
}