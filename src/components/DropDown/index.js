import React from "react";
import "./index.css";
export default class DropDown extends React.Component {
  state = {
    selectedOptionIndex: 0,
    dispalyList: false
  };

  listRef = React.createRef();
  pageButtonsIsClicked= false;
  componentDidUpdate() {
    if (this.state.dispalyList) {
      this.listRef.current.focus();
      this.updateScrollBar();
      
    }
    if(this.pageButtonsIsClicked){
      const element = this.listRef.current.children[
        this.state.selectedOptionIndex
      ];
      this.listRef.current.scrollTop =element.offsetTop;
    }
    this.pageButtonsIsClicked=false;
  }

  buttonClickedHandler = () => {
    this.setState(state => {
      return { dispalyList: !state.dispalyList };
    });
  };

  itemClickedHandler = index => {
    this.setState(state => {
      return {
        selectedOptionIndex: index,
        dispalyList: !state.dispalyList
      };
    });
  };
  updateScrollBar() {
    const element = this.listRef.current.children[
      this.state.selectedOptionIndex
    ];
    if (this.listRef.current.scrollHeight > this.listRef.current.clientHeight) {
      const scrollBottom =
        this.listRef.current.clientHeight + this.listRef.current.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        this.listRef.current.scrollTop =
          elementBottom - this.listRef.current.clientHeight;
      } else if (element.offsetTop < this.listRef.current.scrollTop) {
        this.listRef.current.scrollTop = element.offsetTop;
      }
    }
  }
  selectedItemChangedHandler = event => {
    event.preventDefault();
    const key = event.key;
    let index = this.state.selectedOptionIndex;
    const lastItemIndex = this.props.options.length - 1;
    const firstItemIndex = 0;
    
    const element = this.listRef.current.children[0];
    const numberOfElementsViewed = Math.floor( this.listRef.current.clientHeight/ element.offsetHeight); 
  
    switch (key) {
      case "ArrowUp":
        if (index > 0) {
          this.setState({ selectedOptionIndex: index - 1 });
        }
        break;

      case "ArrowDown":
        if (index < this.props.options.length - 1) {
          this.setState({ selectedOptionIndex: index + 1 });
        }
        break;
      case "Enter":
        this.itemClickedHandler(index);
        break;
      case "Home":
        this.setState({ selectedOptionIndex: firstItemIndex });
        break;
      case "End":
        this.setState({ selectedOptionIndex: lastItemIndex });
        break;

      case "Escape":
        this.setState({ dispalyList: false });
        break;
      case "PageUp":
        index = index-numberOfElementsViewed;
        index = index <0 ?0 :index;
        this.pageButtonsIsClicked=true;
        this.setState({ selectedOptionIndex: index });
        break;
      case "PageDown":
        this.pageButtonsIsClicked=true;
        index = index + numberOfElementsViewed;
        index = index >lastItemIndex ? lastItemIndex :index;
        this.setState({ selectedOptionIndex: index });
        break;
      default:
        break;
    }
  };

  itemHoverHandler(index) {
    this.setState({ selectedOptionIndex: index });
  }
  render() {
    if (this.state.dispalyList === false) {
    }
    const listItems = this.props.options.map((value, index) => {
      let id = `exp_elem_${value.substr(0, 2)}`;
      let focusedClass = "";
      if (index === this.state.selectedOptionIndex) {
        focusedClass = " focused";
      }

      return (
        <li
          key={id}
          id={id}
          role="option"
          onMouseOver={() => this.itemHoverHandler(index)}
          aria-selected={focusedClass ? "true" : "false"}
          className={`${focusedClass} `}
          onClick={() => this.itemClickedHandler(index)}
        >
          {value}
        </li>
      );
    });
    const selectedOptionId = `exp_elem_${this.props.options[
      this.state.selectedOptionIndex
    ].substr(0, 2)}`;
    return (
      <>
        <span id="exp_elem">Choose an element:</span>

        <div id="exp_wrapper">
          <button
            className="form-control"
            aria-haspopup="listbox"
            aria-labelledby="exp_elem exp_button"
            id="exp_button"
            aria-expanded={this.state.dispalyList}
            onClick={this.buttonClickedHandler}
          >
            {this.props.options[this.state.selectedOptionIndex]}
          </button>
          {this.state.dispalyList && (
            <ul
              id="exp_elem_list"
              role="listbox"
              tabIndex={-1}
              aria-labelledby="exp_elem"
              className={`from-control`}
              aria-activedescendant={selectedOptionId}
              onKeyDown={this.selectedItemChangedHandler}
              ref={this.listRef}
            >
              {listItems}
            </ul>
          )}
        </div>
      </>
    );
  }
}
