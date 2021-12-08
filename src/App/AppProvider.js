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
      setCurrentFavourite: this.setCurrentFavourite,
      setFilteredCoins: this.setFilteredCoins,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    this.setState({ prices });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favourites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favourites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
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
    let currentFavourite = this.state.favourites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavourite,
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      "cryptoWatch",
      JSON.stringify({
        favourites: this.state.favourites,
        currentFavourite,
      })
    );
  };

  setCurrentFavourite = (sym) => {
    this.setState({
      currentFavourite: sym,
    });

    localStorage.setItem(
      "cryptoWatch",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoWatch")),
        currentFavourite: sym,
      })
    );
  };

  savedSettings() {
    let CryptoWatchData = JSON.parse(localStorage.getItem("cryptoWatch"));
    if (!CryptoWatchData) {
      return { page: "settings", firstVisit: true };
    }
    let { favourites, currentFavourite } = CryptoWatchData;
    return { favourites, currentFavourite };
  }

  setPage = (page) => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
