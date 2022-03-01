import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import {useWeb3React} from "@web3-react/core"
import {OnlyOwner} from "../hooks/hookOnlyOwner"


export const Admin = () => {

    const hook = OnlyOwner()

    const {account} = useWeb3React()

    return (
        <div>
            {
                // TODO: hardkodovano
                account === "0x5E20Aee97eDa500FbdFD1F3F863318d2bfA51ef3" ?
                (
                    <>
                        <Button variant="outlined" size="large" onClick={() => hook._getState()}>GET STATE</Button>
                        <Button variant="outlined" size="large" onClick={() => hook._getBalance()}>GET BALANCE</Button>
                        <Button variant="outlined" size="large" onClick={() => hook._startLottery()}>START LOTTERY</Button>
                        <Button variant="outlined" size="large" onClick={() => hook._endLottery()}>END LOTTERY</Button>
                        <Button variant="outlined" size="large" onClick={() => hook._payout()}>PAYOUT</Button>
                     </>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}