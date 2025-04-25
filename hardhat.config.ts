import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "./tasks/block-number";
import "hardhat-gas-reporter";
import "dotenv/config";
import "@typechain/hardhat";


const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.8",
  defaultNetwork:"hardhat",
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter:{
    enabled:true,
    currency:"USD",
    outputFile:"gas-report.txt",
    noColors:true
  }
};
