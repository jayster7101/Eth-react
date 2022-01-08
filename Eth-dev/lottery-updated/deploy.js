const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'bind feature sweet list family route spawn picture sorry boil duty life',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });

  console.log("ABI: ", JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();


/**
 * Run node deploy.js to deploy a new contract and print the new contract address and abi to the terminal.
 * Update lottery.js in the lottery-react frontend with the new contract address and abi.
 */