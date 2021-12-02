import React, { Component } from "react";
import WelcomeMessage from "./WelcomeMessage";
import "./App.css";
import AppLayout from "./AppLayout";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <WelcomeMessage />
      </AppLayout>
    );
  }
}
export default App;
