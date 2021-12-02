import React, { Component } from "react";
import WelcomeMessage from "./WelcomeMessage";
import "./App.css";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppBar/>
        <WelcomeMessage />
      </AppLayout>
    );
  }
}
export default App;
