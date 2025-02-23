require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks:{
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/SjXZW8fEVRGZ-13zPA1TxXF0b0Y6zqS0",
      accounts: ['376f6902c106e2941afb17b7892a9d98a805be711f6df75852a6c21af46a3428']
    }
  }

};
//https://eth-sepolia.g.alchemy.com/v2/SjXZW8fEVRGZ-13zPA1TxXF0b0Y6zqS0