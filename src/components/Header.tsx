import {Button, makeStyles} from "@material-ui/core"
import {injected} from "./Connectors"
import {useWeb3React} from "@web3-react/core"


const useStyles = makeStyles(() => ({
    container: {
        padding: '25px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: '#F8F8F8',
        borderRadius: '5px'
    }
}))


export const Header = () => {

    const classes = useStyles()

    const {active, activate, deactivate} = useWeb3React()

    async function connect(){
        try{
            
            await activate(injected)
        }catch(ex){
            console.log(ex)
        }
    }

    async function disconnect(){
        try{
            await deactivate()
        }catch(ex){
            console.log(ex)
        }
    }

    return(
        <div>
            <div className={classes.container}>
                {
                    !active ? (
                        <Button variant="contained" size="large" onClick={connect} className={classes.button}>
                            Connect
                        </Button>
                    ) : (
                        <Button variant="contained" size="large" onClick={disconnect} className={classes.button}>
                            Deactivate
                        </Button>
                    )
                }
            </div>
        </div>
    )
}