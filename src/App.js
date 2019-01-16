import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Accordion from "./components/Accordion/Accordion";
import Alert from "./components/AlertCOMP/Alert";
class App extends Component {
  render() {
    return (
      <div>
        <main>
          <h1>Accordion Example</h1>
          <Accordion />
          <Alert />
          <h1>Original Project Code</h1>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </main>
      </div>
    );
  }
}

export default App;
