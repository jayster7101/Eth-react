/**
 * ******** TO START RUN npm run start ***********
 */


import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager:"",
    players:[],
    balance:"",
    value:"",
    message: ""
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager,players,balance});
  }
  onSubmit = async (event) => {
    let tryOkay = true;
    event.preventDefault();
    console.log("yes")
    const accounts = await web3.eth.getAccounts();
    this.setState({message:"Waiting on transaction success..."})
    try {
      await lottery.methods.enter().send({
        from:accounts[0], 
        value: web3.utils.toWei(this.state.value,"ether")
      });
    } catch (err) {
        const reason = await (err.message);
        console.log(reason);
        this.setState({message:"Sorry but that transaction failed please try again "})
        tryOkay = false;
    }
    if(tryOkay){
      this.setState({message:"You have successfully been entered into the lottery "});
    };
    
    
  }
  onClick = async () => {
    let tryOkay = true;
    const accounts = await web3.eth.getAccounts();
    this.setState({message:"Waiting on transaction success..."});
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0]
      }); 
    } catch (err) {
      tryOkay = false;
      this.setState({message:"Transaction has failed..."});
    }
    if(tryOkay) this.setState({message:"A winner has been picked"});

  }
  render() {
    //console.log(web3.version); *Checks the version of web3*
    //web3.eth.getAccounts().then(console.log) *Checks the accounts on the instance of the web3*
    return (
      <div>
        <h2>Lottery Contract </h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people competing to win {web3.utils.fromWei(this.state.balance,"ether")} amount of ether! </p>
        <hr />
        <form  onSubmit = {this.onSubmit}>
          <h4>
            Want to try your luck?
          </h4>
          <div>
            <label>Amount of ether to wager</label>
            <input
           // type = {Text}
            value = {this.state.value}
            onChange = {event => this.setState({ value: event.target.value})}
            />
          </div>
          <button>ENTER</button>
        </form>
        <hr />
        <h4>Ready to pick a winner ?</h4>
        <button onClick = {this.onClick}>Pick the winner!</button>
        
        <hr />
          <h1> {this.state.message}</h1>
      </div>
    );
  }
}
export default App;

// *********** DEFAULT CODE FOR RENDER() RETURN ( **************
// <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      //)