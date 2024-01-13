Manually test smart contract via console on the browser:

Pre-requisits
- Node v12+, NPM & Ganache UI or Ganache CLI

Step by Step:
1. Have a very basic smart contract on remix:
	// SPDX-License-Identifier: MIT
	pragma solidity ^0.8.0;

	contract BasicContract {
	    uint public myUint = 10;
	    function setUint(uint _myUint) public{
        	myUint = _myUint;
	    }
	}

2. Using Remix, compile and deploy it to your local Ganache (my case is HTTP://127.0.0.1:8545)

3. Initialize node project by running this command: npm init -y

4. Install these libraries via npm: web3 & web3.js-browser

5. Create an empty index.html file, needs exist at the root of your project, to be able to read Node_Modules

4. Add a script reference to target web3.js-browser on the header of your index.html, code should look like this:

	<!DOCTYPE html>
	<html>
	   <head>
	     <title>Sample web3 site</title>
	     <script src="node_modules/web3.js-browser/build/web3.js"></script>
	   </head>
	   <body>
	   </body>
	</html>

4. Open index.html on a browser and then open the console on the developer tools

5. Create an instance to web3 that will be connected to your local Ganache
	var web3 = new Web3(Web3.providers.HttpProvider("http://localhost:8545"));

6. Verify that you can get the list of accounts available on local Ganache with this command: 
	web3.eth.getAccounts().then(console.log);

7. Create an instance of your smart contract that will be mapped to the Address where the contract was deployed and the ABI json data, generated during the deployment. Replace parameter on below line:

	var myContract = new web3.eth.Contract(PASTE_ABI_ARRAY_HERE, 'CONTRACT_ADDRESS');


   7.1. Replace first parameter with the ABI json data from remix, avaiable on the compilation tab, that the contract that was previously deploy, copy the data and place it on the firt parameter.
   7.2. Second paramer is the address where you deployed the contract, avaiable on Remix, on the deployment tab

8. Send below command the console to trigger myUint method on the smart contract, you should get number 10 as a result.

	myContract.methods.myUint().call().then(result => {
		console.log(result.toString());
	});
	
11. Test second method (setUint) using below command, and replace the address with one of the actual addresses in you Ganache

	myContract.methods.setUint(50)
	.send({ from: "0xcc38eDf96091b66329d3eFdB70602ad96DD57706"})
	.then(result => {console.log(result)});

12. Try again the myUint method to get updated value, you should get a different response now.

	myContract.methods.myUint().call().then(result => {
		console.log(result.toString());
	});
