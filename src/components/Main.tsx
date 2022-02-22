import {Box, makeStyles, TextField} from "@material-ui/core"

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "green",
        padding: "100px"
    }
}))

export const Main = () => {
    const classes = useStyles()

    return(
        <Box component="form" className={classes.container}>
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
        </Box>
    )
}