import LuckySixABI from '../abi.json';

import {
    useContractReads,
    /*usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction*/
} from 'wagmi';

// TODO
const contractAddress = '0x4153a9Ea482a8cCb1737662FF840def7E087A6c8';

const LuckySixContract = {
    address: contractAddress,
    abi: LuckySixABI
}

export const LuckySixFunctions = () => {

    // TODO: isLoading
    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...LuckySixContract,
                functionName: 'platformFee'     // Index 0
            },
            {
                ...LuckySixContract,
                functionName: 'roundDuration'   // Index 1
            },
            {
                ...LuckySixContract,
                functionName: 'roundInfo'       // Index 2
            },
            {
                ...LuckySixContract,
                functionName: 'bonusMultiplier' // Index 3
            }
        ]
    });

    // TODO: Test
    const getPlatformFee = async () => {

        if(!isError){
            console.log(data[0]);
            console.log(data[1]);
            console.log(data[2]);
            console.log(data[3]);
            console.log(isError);
            console.log(isLoading);
        } else {
            console.log("error")
        }

    }

    return {
        getPlatformFee
    }
}


/*
export const LuckySixContract = () => {

    const getRoundInfo = async (provider) => {
        const LuckySixContract = new ethers.Contract(contractAddress, LuckySixABI, await provider);
        console.log(await LuckySixContract.roundInfo());

        //console.log(await provider)
    }

    return {
        getRoundInfo
    }
}
*/

/*
const getPlatfromFee = async () => {
    const contractRead = useContractRead({
        address: contractAddress,
        abi: LuckySixABI,
        functionName: 'platformFee',
        onSuccess(data) {
            console.log(data);
        }
    })
}
*/



/*module.exports = {
    getRoundInfo
}*/
