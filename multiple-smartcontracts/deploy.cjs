const { Web3 } = require('web3'); //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
const fs = require('fs');
const path = require('path');

//const conctractCodePath = 'CompiledCode\\';
//const contractName = 'SampleContract';

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
web3.eth.Contract.handleRevert = true;

// Read the bytecode from the file system
const bytecodePath = path.join(__dirname, 'MyContractBytecode.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

//const bytecodePath2 = path.join(__dirname, conctractCodePath + contractName + 'Bytecode.bin');
//const bytecode2 = fs.readFileSync(bytecodePath2, 'utf8');

// Create a new contract object using the ABI and bytecode
const abi = require('./MyContractAbi.json');
const myContract = new web3.eth.Contract(abi);
//const abi2 = require(path.join(__dirname, conctractCodePath, contractName+'Abi.json'));
//const myContract2 = new web3.eth.Contract(abi2);


async function deploy() {
	const providersAccounts = await web3.eth.getAccounts();
	const defaultAccount = providersAccounts[0];
	console.log('deployer account:', defaultAccount);

	const deployedContract = myContract.deploy({
		data: '0x' + bytecode,
		arguments: [1],
	});

	/*const deployedContract2 = myContract2.deploy({
		data: '0x' + bytecode2,
		arguments: [1],
	});*/

	// optionally, estimate the gas that will be used for development and log it
	const gas = await deployedContract.estimateGas({
		from: defaultAccount,
	});
	/*
	const estimatedGas = await myContract.deploy({
		data: bytecode,
		arguments:  [1],
	  }).estimateGas({
		from: defaultAccount,
		gasPrice: 10000000000,
	  });

	const gas2 = await deployedContract2.estimateGas({
		from: defaultAccount,
	});*/
	console.log('estimated gas:', gas);

	try {
		// Deploy the contract to the Ganache network
		const tx = await deployedContract.send({
			from: defaultAccount,
			gas,
			gasPrice: 10000000000,
		});
		console.log('Contract deployed at address: ' + tx.options.address);

		// Write the Contract address to a new file
		const deployedAddressPath = path.join(__dirname, 'MyContractAddress.bin');
		fs.writeFileSync(deployedAddressPath, tx.options.address);
	} catch (error) {
		console.error(error);
	}
}
deploy();





















/*
// For simplicity we use `web3` package here. However, if you are concerned with the size,
//	you may import individual packages like 'web3-eth', 'web3-eth-contract' and 'web3-providers-http'.
const { Web3 } = require('web3'); //  web3.js has native ESM builds and (`import Web3 from 'web3'`)
const fs = require('fs');
const path = require('path');
const conctractCodePath = 'CompiledCode\\';
const contractName = 'SampleContract';

// Set up a connection to the Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
web3.eth.Contract.handleRevert = true;

// Read the bytecode from the file system
const bytecodePath = path.join(__dirname, conctractCodePath + contractName + 'Bytecode.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

// Create a new contract object using the ABI and bytecode
//const abi = require('./MyContractAbi.json');
const abi = require(path.join(__dirname, conctractCodePath, contractName+'Abi.json'));
const myContract = new web3.eth.Contract(abi);
var contract2 = new web3.eth.Contract(abi,'0xDccDC07fFD63f630eF0ebf88E54BbB0f510353B3');


async function deploy() {
	const providersAccounts = await web3.eth.getAccounts();
	const defaultAccount = providersAccounts[0];
	console.log('deployer account:', defaultAccount);

	const deployedContract = myContract.deploy({
		data: '0x' + bytecode,
		arguments: [1],
	});

	// optionally, estimate the gas that will be used for development and log it
	//try {
		const gas = await deployedContract.estimateGas({
			from: defaultAccount,
		});
		console.log('estimated gas:', gas);
	////} catch (error) {
	//	console.log(error);
	//}
	

	try {
		// Deploy the contract to the Ganache network
		const tx = await deployedContract.send({
			from: defaultAccount,
			gas,
			gasPrice: 10000000000,
		});
		console.log('Contract deployed at address: ' + tx.options.address);

		// Write the Contract address to a new file
		//const deployedAddressPath = path.join(__dirname, 'MyContractAddress.bin');
        const deployedAddressPath = path.join(__dirname, contractName + 'Address.bin')
		fs.writeFileSync(deployedAddressPath, tx.options.address);
	} catch (error) {
		console.error(error);
	}
}

deploy();*/