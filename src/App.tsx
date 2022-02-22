import {DAppProvider, Config, ChainId} from "@usedapp/core"
import {Header} from "./components/Header"
import { Main } from "./components/Main";

const config: Config = {
  supportedChains: [ChainId.Kovan]
}

function App() {
  return (
    <DAppProvider config={config}>
      <Header/>
      <Main/>
    </DAppProvider>
  );
}

export default App;
