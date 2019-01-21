import React from "react";
import RadioGroup from "./radiogroup";
import "./testFormStyle.css";
import "./buttonStyle.css";
import DropDown from './DropDown'
const TestForm = () => {
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
    <div>
      <div role="form" aria-labelledby="testform">
        <h1>Test Form to test Accessibility</h1>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            className="form-control"
            aria-label="first name"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="middlename">Middle Name</label>
          <input
            id="middlename"
            type="text"
            className="form-control"
            aria-label="middle name"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            type="text"
            className="form-control"
            aria-label="last name"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">SurName</label>
          <input
            id="surname"
            type="text"
            className="form-control"
            aria-label="surname"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          {/* <select className="form-control">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
            <option>Option 6</option>
          </select> */}
          <DropDown className="form-control" />
        </div>
        <RadioGroup />
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            Accept terms and conditions
          </label>
        </div>
        <br />
        <div
          tabIndex="0"
          role="button"
          id="action"
          onClick={actionButtonEventHandler}
          onKeyDown={actionButtonEventHandler}
        >
          Submit
        </div>
      </div>
      <br />
      <img
        src="https://www.google.com/search?q=itworx+logo&rlz=1C1GCEU_enEG819EG819&tbm=isch&source=iu&ictx=1&fir=K7q4_aKAsMaAAM%253A%252CxuM0af3C6xvlUM%252C_&usg=AI4_-kTiE2CYbgN0g-VZdMNbdbL3ijgXeA&sa=X&ved=2ahUKEwiExvaV7-rfAhVSsqQKHSytCfQQ9QEwAHoECAAQBA#imgrc=K7q4_aKAsMaAAM:"
        alt="Tamm Logo"
      />
      <br />

      <video controls>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        <link rel="transcript" title="English transcript" href="#theText" />
      </video>
      <transcript id="theText">
        This is the english language transcript for the video...
      </transcript>
    </div>
  );
};

export default TestForm;
