import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    // Connect to Ganache CLI
    async function connectToBlockchain() {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get accounts
          const accs = await web3Instance.eth.getAccounts();
          setAccounts(accs);
        } catch (error) {
          console.error('Error connecting to blockchain:', error);
        }
      } else {
        console.error('Please install MetaMask or another Ethereum wallet provider.');
      }
    }

    connectToBlockchain();
  }, []);

  // Function to get account balances
  const getAccountBalances = async () => {
    if (web3 && accounts.length > 0) {
      const balanceMap = {};
      await Promise.all(accounts.map(async (account) => {
        const balance = await web3.eth.getBalance(account);
        balanceMap[account] = web3.utils.fromWei(balance, 'ether');
      }));
      setBalances(balanceMap);
    }
  };

  return (
    <div className="App">
      <h1>Ethereum React App</h1>
      <p>Connected Accounts: {accounts.join(', ')}</p>
      
      <button onClick={getAccountBalances}>Get Balances</button>

      <h2>Account Balances</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            <strong>Account:</strong> {account}<br />
            <strong>Balance:</strong> {balances[account] || 'Loading...'} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
