import React from "react";
import "./CheckBox.css";

/* EVENT HANDLERS */

class Checkbox extends React.Component {
  state = {
    checked: false,
    arr: []
  };
  constructor() {
    super();

    this.keyCode = Object.freeze({
      ENTER: 13,
      SPACE: 32
    });

    this.handlekeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleKeydown = event => {
    let flag = false;
    switch (event.keyCode) {
      case this.keyCode.SPACE:
      case this.keyCode.ENTER:
        this.evaluateCheck(event);
        flag = true;
        break;
      case this.keyCode.UPARROW:
        break;
      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
  handleClick = event => {
    this.evaluateCheck(event);
  };
  evaluateCheck = event => {
    const targetOne = event.target.id;
    const target = event.target;
    if (!this.state.arr.includes(targetOne)) {
      this.state.arr.push(targetOne);
      target.setAttribute("aria-checked", true);
      this.setState({ arr: this.state.arr });
    } else {
      const ar = this.state.arr;
      ar.splice(ar.indexOf(targetOne), 1);
      target.setAttribute("aria-checked", false);
      this.setState({ arr: ar });
    }
  };

  handleFocus = event => {
    this.domNode.classList.add("focus");
  };

  handleBlur = event => {
    this.domNode.classList.remove("focus");
  };

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <h3 id="id-group-label">Sandwich Condiments</h3>
        {data.map(m => (
          <div role="group" aria-labelledby="id-group-label" key={m.id}>
            <ul
              className="checkboxes"
              onKeyDown={event => this.handleKeydown(event)}
            >
              <li>
                <div
                  id={m.id}
                  role="checkbox"
                  aria-checked="false"
                  tabIndex={m.tabIndex}
                  onClick={event => this.handleClick(event)}
                >
                  {m.Ename}
                </div>
              </li>
            </ul>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Checkbox;
