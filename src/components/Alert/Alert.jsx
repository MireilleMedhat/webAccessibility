import React, { Component } from "react";
import "./Alert.css";

class Alert extends Component {
  /*
   * @function addAlert
   *
   * @desc Adds an alert to the page
   *
   * @param   {Object}  event  -  Standard W3C event object
   *
   */
  handleClick = () => {
    var example = document.getElementById("example");
    var template = document.getElementById("alert-template").innerHTML;

    example.innerHTML = template;
  };
  render() {
    return (
      <div>
        <title>Accordion Example | WAI-ARIA Authoring Practices 1.1</title>

        <main>
          <button id="alert-trigger" onClick={this.handleClick}>
            Trigger Alert
          </button>
          <div id="example" role="alert" />
          <script type="text/template" id="alert-template">
            <p>
              <span lang="da">Hej</span>, hello, <span lang="it">ciao</span>,{" "}
              <span lang="ja">こんにちは</span>, <span lang="ko">안녕</span>
            </p>
          </script>
        </main>
      </div>
    );
  }
}

export default Alert;
