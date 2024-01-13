const solc = require('solc');
const fs = require('fs');
const path = require('path');
//const { contract } = require('web3/lib/commonjs/eth.exports');

const fileName = 'SimpleMarketplace_v2.sol';
const contractName = 'SimpleMarketplace_v2';

// Read the Solidity source code from the file system
const contractPath = path.join(__dirname, './contracts/' + fileName);
const sourceCode = fs.readFileSync(contractPath, 'utf8');

// solc compiler config
const input = {
	language: 'Solidity',
	sources: {
		[fileName]: {
			content: sourceCode,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

// Get the bytecode from the compiled contract
const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;

// Write the bytecode to a new file
const bytecodePath = path.join(__dirname, contractName +'Bytecode.bin');
fs.writeFileSync(bytecodePath, bytecode);

// Log the compiled contract code to the console
console.log('Contract Bytecode:\n', bytecode);

// Get the ABI from the compiled contract
const abi = compiledCode.contracts[fileName][contractName].abi;

// Write the Contract ABI to a new file
const abiPath = path.join(__dirname, contractName + 'Abi.json');
fs.writeFileSync(abiPath, JSON.stringify(abi));

// Log the Contract ABI to the console
console.log('Contract ABI:\n', abi);