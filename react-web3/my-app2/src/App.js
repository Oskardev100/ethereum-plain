import logo from './logo.svg';
import './App.css';

import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

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

      {/* <button onClick={() => { activate(Injected) }}>Metamask</button>
      <button onClick={deactivate}>Disconnect</button> */}
    
    </div>
  );
}

export default App;
