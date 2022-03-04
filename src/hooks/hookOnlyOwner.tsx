import {useWeb3React} from "@web3-react/core"
import {ethers} from "ethers"
import LuckySix from "../dependencies/LuckySix.json"
import contractsMap from "../contractsMap.json"


export const OnlyOwner = () => {

    const {library} = useWeb3React()

    const {abi} = LuckySix
   
    async function _getBalance(){
        const signer = library.getSigner()
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try{
            console.log("ETH balance: " + await contract.getETHBalance() / 10 ** 18)
            console.log("LINK balance: " + await contract.getLINKBalance() / 10 ** 18)
        }catch(ex){
            console.log(ex)
        }
    }
    
    async function _startLottery(){
        const signer = library.getSigner()
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try{
            await contract.startLottery()
            console.log("Lottery Started")
        }catch(ex){
            console.log(ex)
        }
    }

    async function _endLottery(){
        const signer = library.getSigner()
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try{
            await contract.endLottery()
            console.log("Calculating Winner...")
        }catch(ex){
            console.log(ex)
        }
    }

    async function _payout(){
        const signer = library.getSigner()
        const contractAddress = contractsMap[42]["LuckySix"][0]
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try{
            await contract.payout()
            console.log("PAYOUT")
        }catch(ex){
            console.log(ex)
        }
    }

    return {_getBalance, _startLottery, _endLottery, _payout}
}

export default OnlyOwner