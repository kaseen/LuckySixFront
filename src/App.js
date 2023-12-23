import { useNetwork, useSwitchNetwork } from 'wagmi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LotteryEntry } from './components/LotteryEntry';
import { LotteryPayout } from './components/LotteryPayout';
import { useEffect } from 'react';

function App() {

    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    useEffect(() => {
        switchNetwork?.(chain.id);
    }, [switchNetwork])

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<LotteryEntry/>}/>
                    <Route path='/payout' element={<LotteryPayout/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
