import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Replace the ABI below with your actual ABI
const contractABI = [
  [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ItemPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ItemSold","type":"event"},{"inputs":[],"name":"buyItem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"itemPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setItemPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
];

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [contractAddress, setContractAddress] = useState('0x86099664fbed3dc1b2ee9fcd2e4e2407e96f430b');
  const [contractBalance, setContractBalance] = useState('');
  const [contractInstance, setContractInstance] = useState(null);

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

          // Set up contract instance
          const contract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContractInstance(contract);
        } catch (error) {
          console.error('Error connecting to blockchain:', error);
        }
      } else {
        console.error('Please install MetaMask or another Ethereum wallet provider.');
      }
    }

    connectToBlockchain();
  }, [contractABI, contractAddress]);

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

  // Function to get smart contract balance
  const getContractBalance = async () => {
    if (web3 && contractAddress) {
      try {
        const balance = await web3.eth.getBalance(contractAddress);
        setContractBalance(web3.utils.fromWei(balance, 'ether'));
      } catch (error) {
        console.error('Error getting contract balance:', error);
      }
    }
  };

  // Function to set item price
  const setPrice = async () => {
    if (contractInstance && web3) {
      try {
        const newPrice = web3.utils.toWei('0.05', 'ether'); // hard coded price
        await contractInstance.methods.setItemPrice(newPrice).send({ from: accounts[0] });
        console.log('Item price set successfully!');
      } catch (error) {
        console.error('Error setting item price:', error);
      }
    }
  };

  // Function to buy item
  const buyItem = async () => {
    if (contractInstance && web3) {
      try {
        await contractInstance.methods.buyItem().send({ from: accounts[0], value: web3.utils.toWei('0.5', 'ether') });
        console.log('Item bought successfully!');
      } catch (error) {
        console.error('Error buying item:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="App">
      <h1>Ethereum React App</h1>
      <p>Connected Accounts: {accounts.join(', ')}</p>
      
      <button onClick={getAccountBalances}>Get Account Balances</button>

      <h2>Account Balances</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            <strong>Account:</strong> {account}<br />
            <strong>Balance:</strong> {balances[account] || 'Loading...'} ETH
          </li>
        ))}
      </ul>

      <div>
        <label>Smart Contract Address:</label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <button onClick={getContractBalance}>Get Contract Balance</button>
        <p>
          <strong>Smart Contract Balance:</strong> {contractBalance || 'N/A'} ETH
        </p>
      </div>
    </div>
      <div>
        <button onClick={setPrice}>Set Price</button>
        <button onClick={buyItem}>Buy Item</button>
      </div>
    </div>
  );
}

export default App;