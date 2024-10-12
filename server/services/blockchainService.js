const Web3 = require('web3');
require('dotenv').config();

// ABI and CONTRACT_ADDRESS should be imported or defined here
const ABI = []; // Replace with your contract ABI
const CONTRACT_ADDRESS = ''; // Replace with your contract address

let web3;
let donationContract;

const initializeWeb3 = () => {
  if (typeof web3 !== 'undefined') {
    return; // Web3 is already initialized
  }

  const provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_NODE_URL);
  web3 = new Web3(provider);
  donationContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
};

const recordDonationOnBlockchain = async (donationId, amount, donor) => {
  try {
    initializeWeb3();
    
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No Ethereum accounts available');
    }

    const result = await donationContract.methods.recordDonation(donationId, amount).send({
      from: accounts[0],
      gas: 2000000
    });

    console.log(`Donation recorded on blockchain. Transaction hash: ${result.transactionHash}`);
    return result.transactionHash;
  } catch (error) {
    console.error('Error recording donation on blockchain:', error);
    throw error;
  }
};

module.exports = { recordDonationOnBlockchain };