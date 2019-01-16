import React, { Component } from "react";
import "./Alert.css";
import "./handleAlert";
class Alert extends Component {
  render() {
    return (
      <div>
        <title>Accordion Example | WAI-ARIA Authoring Practices 1.1</title>

        <main>
          <button id="alert-trigger">Trigger Alert</button>
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
