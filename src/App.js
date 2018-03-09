import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import insertdata from './actions/insertdata';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_price: null,
      current_store: null
    }
  }

  handleInputprice = (event) => {
    this.setState({
      current_price: event.target.value
    });
  }

  handleInputstore = (event) => {
    this.setState({
      current_store: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
    insertdata(this.state.current_price, this.state.current_store)
    .then((response) => {
        window.location.reload()
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ACTIVIA</h1>
        </header>
        <p className="App-intro">
          To get started, enter your price and follow the evolution.
        </p>
        <div>
        <form onSubmit={this.onSubmit}>
        <div>
          <label className="topTitle">ACTIVIA strawberry PRICE:</label>
          <input type="text" value={this.state.current_price} className="form-control formset" onChange={this.handleInputprice} />
        </div>
        <div>
            <label className="topTitle">STORE:</label>
            <input type="text" value={this.state.current_store} className="form-control formset" onChange={this.handleInputstore} />
        </div>
        <button type="submit" className="btn submitset dashboard_button" >
            Update
        </button>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
