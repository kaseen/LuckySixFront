import {useEthers} from "@usedapp/core"
import {Button, makeStyles} from "@material-ui/core"

const useStyles = makeStyles(() => ({
    container: {
        //padding: theme.spacing(6),
        padding: "30px",
        display: "flex",
        border: "5px solid #ab003c",
        justifyContent: "flex-end",
        backgroundColor: "#7e57c2"
    },
    button: {
        backgroundColor: "#67b7f7"
    }
}))

export const Header = () => {
    const classes = useStyles()

    const {account, activateBrowserWallet, deactivate} = useEthers()

    const isConnected = (account !== undefined)

    return(
        <div>
            <div className={classes.container}>
                {
                    isConnected ? (
                        <Button variant="contained" onClick={deactivate} className={classes.button}>
                            Deactivate
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={activateBrowserWallet} className={classes.button}>
                            Connect
                        </Button>
                    )
                }
            </div>
        </div>
    )
}