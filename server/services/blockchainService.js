const Web3 = require('web3');
require('dotenv').config();

// ABI and CONTRACT_ADDRESS should be imported or defined here
const ABI = []; // Replace with your contract ABI
const CONTRACT_ADDRESS = ''; // Replace with your contract address

let web3;
let donationContract;

const initializeWeb3 = () => {
  if (!web3) {
    try {
      const provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_NODE_URL);
      web3 = new Web3(provider);
      donationContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      console.log('Web3 initialized successfully');
      
      // Test the connection
      web3.eth.net.isListening()
        .then(() => console.log('Connected to Ethereum node'))
        .catch(e => console.error('Error connecting to Ethereum node:', e));
    } catch (error) {
      console.error('Error initializing Web3:', error);
    }
  }
};

const recordDonationOnBlockchain = async (donationId, amount, donor) => {
  try {
    initializeWeb3();
    const accounts = await web3.eth.getAccounts();
    const transaction = await donationContract.methods
      .recordDonation(donationId, amount, donor)
      .send({ from: accounts[0] }); // Replace with the appropriate account
    return transaction.transactionHash;
  } catch (error) {
    console.error('Error recording donation on blockchain:', error);
    throw error;
  }
};

module.exports = {
  recordDonationOnBlockchain
};