import {useWeb3React} from "@web3-react/core"
import {ethers} from "ethers"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"

const defaultId = 42

export const PublicFunctions = () => {

    const {library, chainId} = useWeb3React()

    const {abi} = LuckySix

    async function _enterLottery(list, value){
        const signer = library.getSigner()
        const contractAddress = contractsMap[Number(chainId)]["ContractAddress"]
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const options = {value: ethers.utils.parseEther(value)}

        try{
            const tx = await contract.enterLottery(list, options)
            const receipt = await tx.wait()
            return receipt.status
        }catch(ex){
            console.log("FATAL")
            console.log(ex)
        }
    }

    async function _getDrawnNumbers(){
        const defaultChainId = typeof chainId === "undefined" ? defaultId : Number(chainId)
        const contractAddress = contractsMap[defaultChainId]["ContractAddress"]
        const provider = contractsMap[defaultChainId]["Provider"]
        const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider(provider))

        try{
            return await contract.getDrawnNumbers()
        }catch(ex){
            console.log(ex)
        }
    }

    async function _getState(){
        const defaultChainId = typeof chainId === "undefined" ? defaultId : Number(chainId)
        const contractAddress = contractsMap[defaultChainId]["ContractAddress"]
        const provider = contractsMap[defaultChainId]["Provider"]
        const contract = new ethers.Contract(contractAddress, abi, ethers.getDefaultProvider(provider))
        
        try{
            return Number(await contract.lottery_state())
        }catch(ex){
            console.log(ex)
        }
    }

    return {_enterLottery, _getDrawnNumbers, _getState}
}

export default PublicFunctions