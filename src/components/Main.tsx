import {Box, Button, makeStyles, TextField} from "@material-ui/core"

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

    return(
        <div className={classes.columnFlex}>
            <Box component="form" className={classes.rowFlex}>
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <TextField />
            </Box>
            <Box className={classes.rowFlex}>
                <Button variant="outlined" size="large" className={classes.button}>Play</Button>
            </Box>
        </div>
    )
}