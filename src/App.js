import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LotteryEntry } from './components/LotteryEntry';
import { LotteryPayout } from './components/LotteryPayout'

function App() {
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
