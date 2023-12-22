const solc = require('solc');
const fs = require('fs');
const path = require('path');
const contractFilePath = "./Contracts/";

// Define an array of contract filenames
const contractFiles = [contractFilePath + 'SampleContract.sol'];
const outputFolder = 'CompiledCode'; // Specify the custom output folder


// Create the custom output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Loop through each contract file and deploy it
contractFiles.forEach((fileName) => {
  const contractPath = path.join(__dirname, fileName);
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
//  const bytecode = compiledCode.contracts[fileName][fileName].evm.bytecode.object;

const bytecode = compiledCode.contracts[contractFilePath+"SampleContract.sol"]["SampleContract"].evm.bytecode.object;
//const bytecode = compiledCode.contracts[SampleContract][SampleContract].evm.bytecode.object;

  // Write the bytecode to a new file in the custom output folder
  //const bytecodePath = path.join(__dirname, outputFolder, `${fileName}Bytecode.bin`);
  const bytecodePath = path.join(__dirname, outputFolder, `${'SampleContract'}Bytecode.bin`);
  fs.writeFileSync(bytecodePath, bytecode);

  // Log the compiled contract code to the console
  console.log(`Contract Bytecode for ${fileName}:\n`, bytecode);

  // Get the ABI from the compiled contract
//  const abi = compiledCode.contracts[fileName][fileName].abi;
  const abi = compiledCode.contracts["./Contracts/SampleContract.sol"].SampleContract.abi

  // Write the Contract ABI to a new file in the custom output folder
  //const abiPath = path.join(__dirname, outputFolder, `${fileName}Abi.json`);
  const abiPath = path.join(__dirname, outputFolder, `${'SampleContract'}Abi.json`);
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));

  // Log the Contract ABI to the console
  console.log(`Contract ABI for ${fileName}:\n`, abi);
});
