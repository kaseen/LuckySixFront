import {Box, Button, makeStyles} from "@material-ui/core"
import {useWeb3React} from "@web3-react/core"
import {OnlyOwner} from "../hooks/hookOnlyOwner"

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 150,
        position: 'absolute',
        top: '24%',
        right: 0,
        width: '300px'
    },    
}))

export const Admin = () => {

    const classes = useStyles()

    const hook = OnlyOwner()

    const {account} = useWeb3React()

    return (
        <div>
            {
                // TODO: hardkodovano
                account === "0x5E20Aee97eDa500FbdFD1F3F863318d2bfA51ef3" ?
                (
                    <Box className={classes.wrapper}>
                        <Button variant="outlined" size="small" onClick={() => hook._getState()}>GET STATE</Button>
                        <Button variant="outlined" size="small" onClick={() => hook._getBalance()}>GET BALANCE</Button>
                        <Button variant="outlined" size="small" onClick={() => hook._startLottery()}>START LOTTERY</Button>
                        <Button variant="outlined" size="small" onClick={() => hook._endLottery()}>END LOTTERY</Button>
                        <Button variant="outlined" size="small" onClick={() => hook._payout()}>PAYOUT</Button>
                     </Box>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}