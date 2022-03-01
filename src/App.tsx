import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import {Header} from "./components/Header"
import { Main } from "./components/Main";


const getLibrary = (provider) => {
  return new Web3Provider(provider)
}


function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header/>
      <Main/>
    </Web3ReactProvider>
  );
}

export default App;
