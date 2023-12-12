module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: Ganache host)
        port: 8545,            // Ganache's default port
        network_id: "*",        // Match any network ID
      },
    },
    compilers: {
      solc: {
        version: "0.8.9",      // Specify the Solidity compiler version you want to use
      },
    },
  };
  