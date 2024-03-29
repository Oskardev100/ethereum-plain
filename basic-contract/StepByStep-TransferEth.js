//on your NODE terminal, run one by one all this commands on each step.

//Step 1. Create a const to hold Web3
//const Web3 = require('web3'); <-- use this for web3 earlier versions than 4x
//for 4x, use below:
const { Web3 } = require('web3');


//Step 2. Specify the URL of your Ganache blockchain
const ganacheUrl = 'http://localhost:7545'; // Default Ganache URL

//Step 3. Create a Web3 instance
const web3 = new Web3(ganacheUrl);

/* understanding below line
 web3.eth.net.isListening()
  .then(() => console.log('Connected to Ganache'))
  .catch(error => console.error('Connection error:', error));
*/

//Step 4. Check if Web3 is properly connected to Ganache
web3.eth.net.isListening().then(() => console.log('Connected to Ganache')).catch(error => console.error('Connection error:', error));


//StepTransfer found from one account to other in Ganache
//Step 5. Set the sender account by copying any of the accounts listed on Ganache and past them in the below constant
const senderAddress = '0x1E446B2cE620b67F9ECEc140Cfa3A8238fF834a9';

//Step 6. Set the receiver account by copying a different accounts listed on Ganache and past them in the below constant
const receiverAddress = '0x76bb2E15acda9578c4Fe9Ef068a9cc5A67561aa0';

//Step 7. Set amount of the transfer
const amountToSend = web3.utils.toWei('1', 'ether'); // 1 ether


/* understanding below line
web3.eth.sendTransaction({
   from: senderAddress,
   to: receiverAddress,
   value: amountToSend
})
.then(receipt => {
   console.log('Transaction receipt:', receipt);
})
.catch(error => {
   console.error('Transaction error:', error);
});
*/

//Step 8. Execute transaction
web3.eth.sendTransaction({from: senderAddress, to: receiverAddress, value: amountToSend  }).then( receipt => { console.log('Transaction receipt:', receipt);}).catch( error => { console.error('Transaction error:', error ); });

