import React, { Component } from "react";
import logo from "./logo.svg";
import TestForm from "./components/testForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <TestForm />
      </main>
    );
  }
}

export default App;
