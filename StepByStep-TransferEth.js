//on your terminal, run one by one all this commands on each step.

//Step 1. Setup local environment to install web3 npm, by running this command.
npm install web3

//Step 2. Switch to node terminal

//Step 3. Create a const to hold Web3
const Web3 = require('web3');

//Step 4. Specify the URL of your Ganache blockchain
const ganacheUrl = 'http://localhost:7545'; // Default Ganache URL

//Step 5. Create a Web3 instance
const web3 = new Web3(ganacheUrl);

/* understanding below line
 web3.eth.net.isListening()
  .then(() => console.log('Connected to Ganache'))
  .catch(error => console.error('Connection error:', error));
*/

//Step 6. Check if Web3 is properly connected to Ganache
web3.eth.net.isListening().then(() => console.log('Connected to Ganache')).catch(error => console.error('Connection error:', error));


//StepTransfer found from one account to other in Ganache
//Step 7. Set the sender account by copying any of the accounts listed on Ganache and past them in the below constant
const senderAddress = '0x25DcD13221747FE244D83cC7fd417810496e7371';

//Step 8. Set the receiver account by copying a different accounts listed on Ganache and past them in the below constant
const receiverAddress = '0x287dd6fFcEb729a23ae02Cb32eA21Fa8f23C4840';

//Step 9. Set amount of the transfer
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

//Step 10. Execute transaction
web3.eth.sendTransaction({from: senderAddress, to: receiverAddress, value: amountToSend  }).then( receipt => { console.log('Transaction receipt:', receipt);}).catch( error => { console.error('Transaction error:', error ); });

