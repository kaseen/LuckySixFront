import {useWeb3React} from "@web3-react/core"
import {ethers} from "ethers"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"


export const PublicFunctions = () => {

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
            console.log("FATAL")
            console.log(ex)
        }
    }

    async function _getDrawnNumbers(){
        const contractAddress = contractsMap[42]["LuckySix"][0]
        // TODO: HARDKODOVAN PROVIDER
        const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
        try{
            return await contract.getDrawnNumbers()
        }catch(ex){
            console.log(ex)
        }
    }

    async function _getState(){
        const contractAddress = contractsMap[42]["LuckySix"][0]
        // TODO: HARDKODOVAN PROVIDER
        const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"))
        try{
            return Number(await contract.lottery_state())
        }catch(ex){
            console.log(ex)
        }
    }

    return {_enterLottery, _getDrawnNumbers, _getState}
}

export default PublicFunctions