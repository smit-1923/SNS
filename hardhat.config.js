require("@nomiclabs/hardhat-waffle");
// require('.env').config();
// const env = require('./env');
require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

const privateKey1 = "3ad9c76048f707c4e251c67cc8451fc9ec712bedbd350d1aa7fbbc8f0f2f7764";
const etherscanKey = process.env.POLYGONSCAN_API_KEY;


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/TfRVLAexq-RYDNka2_MOtUcyXAeEqtLb",
      accounts: [privateKey1]
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/uVqq6oYuHXC0uzZwU4ybFSoykdfdjTPg",
      accounts: [privateKey1]
    }
  },
  etherscan: {
    apiKey: [etherscanKey]
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
