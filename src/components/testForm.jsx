import React from "react";
import "./testFormStyle.css";
import Alert from "./components/Alert/Alert";
const TestForm = () => {
  return (
    <div>
      <h1>Accordion Example</h1>
      <Alert />
      <br />
      <span>Hover the red box</span>
      <div id="movingDiv" />

      <h1>Test Form to test Accessibility</h1>

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

      <form>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="middlename">Middle Name</label>
          <input id="middlename" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="surname">SurName</label>
          <input id="surname" type="text" className="form-control" />
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

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Male
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="female"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Female
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="terms" />
          <label class="form-check-label" for="terms">
            Accept terms and conditions
          </label>
        </div>

        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
      <br />
    </div>
  );
};

export default TestForm;
