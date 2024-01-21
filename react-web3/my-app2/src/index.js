import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
   return new Web3Provider(provider);
}

// const getLibrary = (provider) => {
//   const library = new ethers.providers.Web3Provider(provider);
//   library.pollingInterval = 8000; // frequency provider is polling
//   return library;
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    </Web3ReactProvider>
  </React.StrictMode>
);