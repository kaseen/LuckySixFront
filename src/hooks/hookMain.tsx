import {useWeb3React} from "@web3-react/core"
import {ethers} from "ethers"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"


export const EnterLottery = () => {

    const {account, library} = useWeb3React()

    const {abi} = LuckySix

    async function _enterLottery(){
        const signer = library.getSigner()
        // TODO: HARDKODOVAN 42 I POSLEDNJI 0
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const options = {value: ethers.utils.parseEther("0.0000069")}
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try{
            console.log(await contract.enterLottery([1,2,3,4,5,6], options))
        }catch(ex){
            console.log(ex)
        }
    }

    return {_enterLottery}
}

export default EnterLottery