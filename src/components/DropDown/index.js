import React from "react";
import "./index.css";
export default class DropDown extends React.Component {
  state = {
    //selectedOption: {
    selectedOptionIndex: 0,
    selectedOptionId: "",
    //selectedOptionText: "",
    // },
    dispalyList: false,
  };
  //list of options that will be passed through props
  options = [
    "Neptunium",
    "Plutonium",
    "Curium",
    "Americium",
    "Berkelium",
    "Californium",
    "Einsteinium",
    "Fermium"
  ];

  list=React.createRef();

 componentDidUpdate()
 {
   if(this.state.dispalyList){
    this.list.current.focus();
   }
 }

  buttonClickedHandler = () => {
    this.setState(state => {
      return { dispalyList: !state.dispalyList };
    });

  };

  itemClickedHandler =(id,index) =>{
    this.setState(state => {return{selectedOptionId:id , selectedOptionIndex:index ,dispalyList: !state.dispalyList}});
    //this.list.current.aria-activedescendant // = this.state.selectedOptionId;
  }
  
  selectedItemChangedHandler = event => {
    console.log(event.key);
    let key = event.key;
    let index = this.state.selectedOptionIndex;
    let id = `exp_elem_${this.options[index].substr(0, 2)}`;
    const len = this.options.length-1;
    switch (key) {
      case "ArrowUp":
        if (index > 0) this.setState({ selectedOptionIndex: --index });
        break;

      case "ArrowDown":
        if ( index < this.options.length-1) 
        this.setState({ selectedOptionIndex: ++index });
        break;
      case "Enter":
      case " ":
      this.itemClickedHandler(id,index);
      break;
      case "Home":
      this.setState({ selectedOptionIndex: 0 })
      break;
      case "End":
      this.setState({ selectedOptionIndex: len })
      break;
      default:
        break;
    }
  };
  render() {
    ///////////////
    if (this.state.dispalyList === false) {
    }
    const listItems = this.options.map((value, index) => {
      let id = `exp_elem_${value.substr(0, 2)}`;
      let focusedClass = "";
      if (index === this.state.selectedOptionIndex) {
        console.log(this.state.selectedOptionIndex);
        focusedClass = " focused";
      }

      return (
        <li
          key={id}
          id={id}
          role="option"
          aria-selected={focusedClass ? "true" : "false"}
          className={focusedClass}
          onClick ={()=>this.itemClickedHandler(id,index)}
        >
          {value}
        </li>
      );
    });

    console.log(this.state); //////////////
    return (
     /// <div className="listbox-area">
        <div className="left-area">
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
              {this.options[this.state.selectedOptionIndex]}
            </button>
            <ul
            
              id="exp_elem_list"
              role="listbox"
              tabIndex={-1}
              aria-labelledby="exp_elem"
              className={`${this.state.dispalyList ? "" : "hidden"} from-control`}
              aria-activedescendant={this.state.selectedOptionId} //TODO: check if it is set automatically
              onKeyDown={this.selectedItemChangedHandler}
              ref ={this.list}
            >
              {listItems}
            </ul>
          </div>
        </div>
     /// </div>
    );
  }
}
