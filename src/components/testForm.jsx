import React from "react";
import Accordion from "./Accordion/Accordion";
import Alert from "./Alert/Alert";
import RadioGroup from "./radioGroup/radiogroup";
import Button from "./button/button";
import CheckBox from "./checkBox/CheckBox";
import "./testFormStyle.css";
import "./button/buttonStyle.css";
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
const TestForm = () => {
  const data = [
    { Ename: "Lettuce", tabIndex: "0", id: "0" },
    { Ename: "Tomato", tabIndex: "0", id: "1" },
    { Ename: "Mustard", tabIndex: "0", id: "2" }
  ];
  return (
    <React.Fragment>
      <div aria-labelledby="testform">
        <div role="form" id="testform" aria-label="testform">
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
            <select className="form-control">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
              <option>Option 6</option>
            </select>
          </div>
          <RadioGroup />

          <br />
          <CheckBox data={data} />
          <br />
          <h3>Accordion Example</h3>
          <Accordion />
          <h3>Alert Example</h3>
          <Alert />
          <Button />
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
    </React.Fragment>
  );
};

export default TestForm;
