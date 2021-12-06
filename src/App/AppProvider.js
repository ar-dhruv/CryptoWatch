import React from "react";
import _ from "lodash";

const cc = require("cryptocompare");
cc.setApiKey(
  "d445eea82b7e7388f1d3c52de92371240fa8a4d2ef115b01a0952aba272ed494"
);

export const AppContext = React.createContext();

const MAX_FAVOURITES = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favourites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavourites: this.isInFavourites,
      confirmFavourites: this.confirmFavourites,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
    console.log(coinList);
  };

  addCoin = (key) => {
    let favourites = [...this.state.favourites];
    if (favourites.length < MAX_FAVOURITES) {
      favourites.push(key);
      this.setState({ favourites });
    }
  };

  removeCoin = (key) => {
    let favourites = [...this.state.favourites];
    this.setState({ favourites: _.pull(favourites, key) });
  };

  isInFavourites = (key) => _.includes(this.state.favourites, key);

  confirmFavourites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard",
    });
    localStorage.setItem(
      "cryptoWatch",
      JSON.stringify({
        test: "hello",
      })
    );
  };

  savedSettings() {
    let CryptoWatchData = JSON.parse(localStorage.getItem("cryptoWatch"));
    if (!CryptoWatchData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }

  setPage = (page) => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
