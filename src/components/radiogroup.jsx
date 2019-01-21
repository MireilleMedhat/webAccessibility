import React, { Component } from "react";
import "./radioGroupStyle.css";
class RadioGroup extends Component {
  constructor() {
    super();
    this.keyCode = Object.freeze({
      RETURN: 13,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    });
  }
  state = {
    selectedOption: "option1"
  };
  handleClick = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.id
    });
  };
  count = 0;
  handleRightDown = () => {
    if (this.state.selectedOption === "option1")
      this.setState({ selectedOption: "option2" });
    else if (this.state.selectedOption === "option2")
      this.setState({ selectedOption: "option3" });
    else if (this.state.selectedOption === "option3")
      this.setState({ selectedOption: "option1" });
  };

  handleLeftUp = () => {
    if (this.state.selectedOption === "option1")
      this.setState({ selectedOption: "option3" });
    else if (this.state.selectedOption === "option2")
      this.setState({ selectedOption: "option1" });
    else if (this.state.selectedOption === "option3")
      this.setState({ selectedOption: "option2" });
  };

  handleKeydown = event => {
    let flag = false;

    switch (event.keyCode) {
      case this.keyCode.SPACE:
      case this.keyCode.RETURN:
        flag = true;
        break;

      case this.keyCode.UP:
      case this.keyCode.LEFT:
        this.handleLeftUp();
        flag = true;
        break;

      case this.keyCode.DOWN:
      case this.keyCode.RIGHT:
        this.handleRightDown();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div role="radiogroup" aria-labelledby="group_label_1" id="rg1">
          <h3 id="group_label_1">Skills</h3>
          <div
            role="radio"
            aria-checked={this.state.selectedOption === "option1"}
            onClick={this.handleClick}
            onKeyDown={this.handleKeydown}
            tabIndex="0"
            id="option1"
            count="0"
          >
            JavaScript
          </div>
          <div
            role="radio"
            aria-checked={this.state.selectedOption === "option2"}
            onClick={this.handleClick}
            onKeyDown={this.handleKeydown}
            tabIndex="-1"
            id="option2"
            count="1"
          >
            React.JS
          </div>
          <div
            role="radio"
            aria-checked={this.state.selectedOption === "option3"}
            onClick={this.handleClick}
            onKeyDown={this.handleKeydown}
            tabIndex="-1"
            id="option3"
            count="2"
          >
            Backend Development
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioGroup;
