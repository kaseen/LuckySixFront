import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {EnterLottery} from "../hooks/enterLottery"
 

const useStyles = makeStyles(() => ({
    columnFlex: {
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "green"
    },
    rowFlex:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "60px"
    },
    button: {
        backgroundColor: "white"
    }
}))


export const Main = () => {

    const classes = useStyles()

    const fja = EnterLottery()

    let combination : Array<Number> = [-1,-1,-1,-1,-1,-1]

    const handleButton = () => {
        fja.test()
    }

    //TODO: TIMER JEL STARTOVAN ILI SE RACUNA WINNER
    //TODO: PLAY NE MOZE DA SE KLIKNE AKO NIJE VALIDAN INPUT U POLJA SA BROJEVIMA
    //TODO: VALIDAN INPUT BROJ IZMEDJU 1-48 I SVI RAZLICITI
    //TODO: POLJE ZACRVENI AKO NIJE VALIDAN INPUT
    return(
        <div className={classes.columnFlex}>
            <Box component="form" className={classes.rowFlex}>
                <TextField onChange={(v) => combination[0] = Number(v.target.value)}/>
                <TextField onChange={(v) => combination[1] = Number(v.target.value)}/>
                <TextField onChange={(v) => combination[2] = Number(v.target.value)}/>
                <TextField onChange={(v) => combination[3] = Number(v.target.value)}/>
                <TextField onChange={(v) => combination[4] = Number(v.target.value)}/>
                <TextField onChange={(v) => combination[5] = Number(v.target.value)}/>
            </Box>
            <Box className={classes.rowFlex}>
                <Button variant="outlined" size="large" onClick={handleButton} className={classes.button}>
                    Play
                </Button>
            </Box>
        </div>
    )
}