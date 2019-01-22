import React from "react";
const Button = () => {
  function actionButtonEventHandler(event) {
    var type = event.type;
    // Grab the keydown and click events
    if (type === "keydown") {
      // If either enter or space is pressed, execute the funtion
      if (event.keyCode === 13 || event.keyCode === 32) {
        alert("The button is working :D");
        event.preventDefault();
      }
    } else if (type === "click") {
      alert("The button is working :D");
    }
  }
  return (
    <div
      tabIndex="0"
      role="button"
      id="action"
      onClick={actionButtonEventHandler}
      onKeyDown={actionButtonEventHandler}
    >
      Submit
    </div>
  );
};

export default Button;
