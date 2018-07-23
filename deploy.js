const HDWalletProvider = require('truffle-hdWallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'agent core trial inquiry spring party buyer mutual state extend grab cinnamon',
  'https://rinkeby.infura.io/VnR4OaDO6hckOpPLhDbx'
);

//this takes our provider & passes it to the Web3 constructor and gives us an
// instance of Web3
const web3 = new Web3(provider);
//created this function in able to use the async await syntax.  You can't call
//this is outside of a function so created here

const deploy = async () => {
//get a list of all getAccounts our of our Web3 instance
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

//create a new instance of our contract by using the web3 contract constructor
//JSON passes on the ABI
const result = await new web3.eth.Contract(JSON.parse(interface))

    //call deploy on the contract
      .deploy({ data: bytecode })

      //call send to send the transaction to the network
      //accounts[0] means we will be using the first account on
      //the list of mneumonic accounts, since we start w/ 0 when counting
        .send({ gas: '1000000', from: accounts[0] });
//this records & tells me where my contract was deployed to
          console.log('Contract deployed to', result.options.address);
};
deploy();
