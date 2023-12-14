import { formatUnits } from 'viem';
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

    // TODO: Handle isError & isLoading
    const { data /*, isError, isLoading */ } = useContractReads({
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
                functionName: 'lotteryState'    // Index 3
            }
        ]
    });

    /**
     * @dev This function reads the current lottery states and returns them to the body to be rendered.
     */
    const readPlatfromStates = () => {

        /**
         * @dev The lottery states are defined in `github.com/kaseen/LuckySix/src/interfaces/ILuckySix.sol`.
         */
        const LOTTERY_STATE = {
            0: 'Ready',
            1: 'Started',
            2: 'Calculating',
            3: 'Drawing',
            4: 'Closed'
        }

        try {

            // TODO: Show the date in the user's current time zone
            const unixTimestamp = formatUnits(data[2].result[1], -1);
            const dateStarted = new Date(unixTimestamp * 1000);
            const formatter = new Intl.DateTimeFormat(
                'en', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: 'h23'
                });

            // Return an object literal containing all lottery states
            return {
                platfromFee: formatUnits(data[0].result, 18),
                roundDuration: formatUnits(data[1].result, -1),
                numberOfRound: formatUnits(data[2].result[0], -1),
                dateStarted: formatter.format(dateStarted),
                isStarted: data[2].result[2] ? 'Started' : 'Not started',
                lotteryState: LOTTERY_STATE[formatUnits(data[3].result, -1)]            
            }

        } catch (e) {
            console.log('Error loading platfrom states.');
            console.error(e);
        }

    }

    return {
        readPlatfromStates
    }
}