import { useNetwork, useSwitchNetwork } from 'wagmi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LotteryEntry } from './components/LotteryEntry';
import { LotteryPayout } from './components/LotteryPayout';
import { useEffect, useState } from 'react';

function App() {

    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    // eslint-disable-next-line
    const [_, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        switchNetwork?.(chain.id);
    }, [chain, switchNetwork]);

    useEffect(() => {
        const resize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', resize)
    }, []);

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
