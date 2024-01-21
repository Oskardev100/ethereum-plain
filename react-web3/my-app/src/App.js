import logo from './logo.svg';
import './App.css';

// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { useWeb3React } from '@web3-react/core'

// const CoinbaseWallet = new WalletLinkConnector({
//  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  appName: "Web3-react Demo",
//  supportedChainIds: [1, 3, 4, 5, 42],
// });

// const WalletConnect = new WalletConnectConnector({
//  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  bridge: "https://bridge.walletconnect.org",
//  qrcode: true,
// });

const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42, 1337]
});

 

function App() {
  const { activate, deactivate } = useWeb3React();


  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* <button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
      <button onClick={() => { activate(WalletConnect) }}>Wallet Connect</button> */}
      <button onClick={() => { activate(Injected) }}>Metamask</button>
      
      <button onClick={deactivate}>Disconnect</button>
    </div>
  );
}

export default App;
