import { LuckySixFunctions } from '../dependencies/web3';

export const Body = () => {

    const LuckySix = LuckySixFunctions();

    return (
        <div>
            <button onClick={LuckySix.getPlatformFee}>Do function</button>
        </div>
    )
}
