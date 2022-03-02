import {useWeb3React} from "@web3-react/core"
import {ethers} from "ethers"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"


export const EnterLottery = () => {

    const {library} = useWeb3React()

    const {abi} = LuckySix

    async function _enterLottery(list, value){
        const signer = library.getSigner()
        // TODO: HARDKODOVAN 42 I POSLEDNJI 0
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const options = {value: ethers.utils.parseEther(value)}

        try{
            console.log(await contract.enterLottery(list, options))
        }catch(ex){
            console.log(ex)
        }
    }

    return {_enterLottery}
}

export default EnterLottery