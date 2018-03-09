import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import insertdata from './actions/insertdata';
import pricesActions from './store/price/actions';
import getPrices from "./store/price/selectors";
import { connect } from 'react-redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_price: null,
      current_store: null
    }
  }

  componentDidMount() {
    this.props.retrievePrices();
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

  formatDate(date) {
    let format_date = new Date(date);
    if (typeof date !== "undefined")  {
      return format_date.getDate()+'/'+(format_date.getMonth()+1)+'/'+format_date.getFullYear();}
    else {
      return ""}
  }

  render() {

    let listPrices = this.props.prices.map((price, index) => {
      let formated_date = this.formatDate(price.date);
        return (
            <div>
              <h3>{price.price} € {formated_date} {price.store}</h3>
            </div>
        )
    });

    let noPriceYet = <div>
                      <p></p>
                    </div>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ACTIVIA</h1>
        </header>
        <p className="App-intro">
          Enter the price you see on Activia strawberry x4 and follow the evolution seen by the different users.
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
            SEND
        </button>
        </form>
        </div>
        <div>
        <h1> List of prices </h1>
        {this.props.prices.length !== 0 ? listPrices : noPriceYet}
        </div>
      </div>
    );
  }
}

export default connect(getPrices, pricesActions)(App);
