import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Accordion from "./components/Accordion/Accordion";
class App extends Component {
  render() {
    return (
      <div className="App">
        <form>
          <h1>Accordion Demo</h1>
          <Accordion>
            <div label="Alligator Mississippiensis">
              <p>
                <strong>Common Name:</strong> American Alligator
              </p>
              <p>
                <strong>Distribution:</strong> Texas to North Carolina, US
              </p>
              <p>
                <strong>Endangered Status:</strong> Currently Not Endangered
              </p>
            </div>
            <div label="Alligator Sinensis">
              <p>
                <strong>Common Name:</strong> Chinese Alligator
              </p>
              <p>
                <strong>Distribution:</strong> Eastern China
              </p>
              <p>
                <strong>Endangered Status:</strong> Critically Endangered
              </p>
            </div>
            <div label="Third Acc">
              <p>
                <strong>Common Name:</strong> Chinese Alligator
              </p>
              <p>
                <strong>Distribution:</strong> Eastern China
              </p>
              <p>
                <strong>Endangered Status:</strong> Critically Endangered
              </p>
            </div>
          </Accordion>

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
        </form>
        <script src="js/accordion.js" />
      </div>
    );
  }
}

export default App;
