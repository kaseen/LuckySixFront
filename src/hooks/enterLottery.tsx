import {useContractFunction, useEthers} from "@usedapp/core"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"
import {Contract, utils, constants} from "ethers"

export const EnterLottery = () => {
    const {chainId} = useEthers()
    const {abi} = LuckySix

    const luckySixAddress = chainId ? contractsMap[String(chainId)]["LuckySix"][0] : constants.AddressZero
    const luckySixInterface = new utils.Interface(abi)
    const luckySixContract = new Contract(luckySixAddress, luckySixInterface)

    const {send: _sendEnterLottery, state: stateOfTransaction} = useContractFunction(luckySixContract, "startLottery")

    const sendEnterLottery = (combination: Array<Number>) => {
        return _sendEnterLottery(combination)
    }

    return {sendEnterLottery}
}

export default EnterLottery