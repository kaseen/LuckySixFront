import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {useWeb3React} from "@web3-react/core"
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
        padding: '10px',
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
        marginBottom: '60px'    
    },
    rowFlex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '35px'
    },
    lastDrawnNumbers: {
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: 'white',
        fontSize: '30px',
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

    const {chainId} = useWeb3React()
    const hook = PublicFunctions()

    const [drawnNumbers, setDrawnNumbers] = useState("")
    const [value, setValue] = useState("")
    const [render, setRender] = useState(true)
    const [button, setButton] = useState(true)
    const [combination, setCombination] = useState([-1,-1,-1,-1,-1,-1])
    const [input, setInput] = useState(["","","","","",""])
    const [state, setState] = useState("")

    const enterLottery = () => {
        hook._enterLottery(combination, value)
    }

    const _setCombination = (i, v) => {
        const tmp = combination
        tmp[i] = v
        setCombination(tmp)
        render === true ? setRender(false) : setRender(true)
    }

    const _setInput = (i, v) => {
        const tmp = input
        tmp[i] = v
        setInput(tmp)
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

    //TODO: ISPITAJ JEL RENERUJE KAKO TREBA
    useEffect(() => {
        showNumbers()
        showState()
    }, [render, state, chainId]);

    //TODO: TIMER 
    //TODO: ALLDIFFERENT SVE ZACRVENI
    
    function allDifferent(){
        for (let i = 0; i < 6; i++) {
            for (let j = i + 1; j < 6; j++) {
                if(combination[i] === combination[j])
                    return false
            }
            if(input[i] === "" || combination[i] < 1 || combination[i] > 48)
                return false
        }
        return true
    }

    function checkInput(i, v){
        if(v === "")
            return false
        if(combination[i] < 1 || combination[i] > 48)
            return true
        return false
    }

    function checkButton(){
        if(allDifferent())
            setButton(false)
        else
            setButton(true)
    }

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
                        onChange={(v) => {
                            _setCombination(i, Number(v.target.value))
                            _setInput(i, v)
                            checkButton()
                        }}
                        error={checkInput(i, input[i])}
                        inputProps={{min: 0, style: { textAlign:'center'}}}
                        variant="outlined"
                    />
                    )}
                </section>
                </Box>
                <Box className={classes.rowFlex}>
                    <TextField inputProps={{min: 0, style: {textAlign: 'center'}}} onChange={(v) => setValue(v.target.value)}/>
                </Box>
                <Box className={classes.rowFlex}>
                    <Button variant="outlined" disabled={button} size="large" onClick={enterLottery} className={classes.button}>
                        Play
                    </Button>
                </Box>
            </Box>
            <Box className={classes.lastDrawnNumbers}>
                {drawnNumbers}
            </Box>
        </div>
    )
}