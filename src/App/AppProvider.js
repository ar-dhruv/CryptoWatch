import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavourites: this.confirmFavourites,
    };
  }

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
