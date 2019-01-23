import React, { Component } from "react";
import './styles.css'
// For easy reference
export const keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

// Add or substract depending on key pressed
export const direction = {
  37: -1,
  38: -1,
  39: 1,
  40: 1
};

class AccessabiltyTabs extends Component {
  componentDidMount = () => {
    this.tablist = document.querySelectorAll('[role="tablist"]')[0];
    this.tabs = document.querySelectorAll('[role="tab"]');
    this.panels = document.querySelectorAll('[role="tabpanel"]');
  };

  clickEventListener = event => {
    let tab = event.target;
    this.activateTab(tab, false);
  };

  // Handle keydown on tabs
  keydownEventListener = event => {
    let key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        this.activateTab(this.tabs[this.tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        this.activateTab(this.tabs[0]);
        break;
    }
  };

  // Handle keyup on tabs
  keyupEventListener = event => {
    let key = event.keyCode;
    switch (key) {
      case keys.left:
      case keys.right:
        this.switchTabOnArrowPress(event);
        break;
    }
  };

  switchTabOnArrowPress = event => {
    let pressed = event.keyCode;
    let index = +event.target.getAttribute("index");

    this.focusEventHandler(event);

    if (direction[pressed]) {
      if (index !== undefined) {
        let newIndex = +(index + direction[pressed]);
        if (this.tabs[newIndex]) {
          this.tabs[newIndex].focus();
        } else if (pressed === keys.left || pressed === keys.up) {
          this.tabs[this.tabs.length - 1].focus();
        } else if (pressed === keys.right || pressed == keys.down) {
          this.tabs[0].focus();
        }
      }
    }
  };

  // Activates any given tab panel
  activateTab = (tab, setFocus) => {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    this.deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute("tabindex");

    // Set the tab as selected
    tab.setAttribute("aria-selected", "true");

    // Get the value of aria-controls (which is an ID)
    let controls = tab.getAttribute("aria-controls");

    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute("hidden");

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
  };

  // Deactivate all tabs and tab panels
  deactivateTabs = () => {
    for (let t = 0; t < this.tabs.length; t++) {
      this.tabs[t].setAttribute("tabindex", "-1");
      this.tabs[t].setAttribute("aria-selected", "false");
      this.tabs[t].removeEventListener("focus", this.focusEventHandler);
    }

    for (let p = 0; p < this.panels.length; p++) {
      this.panels[p].setAttribute("hidden", "hidden");
    }
  };

  focusEventHandler = event => {
    let target = event.target;
    setTimeout(this.checkTabFocus, target);
  };

  // Only activate tab on focus if it still has focus after the delay
  checkTabFocus = target => {
    let focused = document.activeElement;
    if (target === focused) {
      this.activateTab(target, false);
    }
  };

  render() {
    return (
      <div className="tabs">
        <div role="tablist" ref={this.tablistdiv} aria-label="Entertainment">
          <button
            index={0}
            role="tab"
            aria-selected="true"
            aria-controls="nils-tab"
            id="nils"
            tabIndex={-1}
            onKeyDown={event => this.keydownEventListener(event)}
            onClick={event => this.clickEventListener(event)}
            onKeyUp={event => this.keyupEventListener(event)}
            onFocus={event => this.focusEventHandler(event)}
          >
            Tab1
          </button>
          <button
            index={1}
            role="tab"
            aria-selected="false"
            aria-controls="agnes-tab"
            id="agnes"
            tabIndex={-1}
            onKeyDown={event => this.keydownEventListener(event)}
            onClick={event => this.clickEventListener(event)}
            onKeyUp={event => this.keyupEventListener(event)}
            onFocus={event => this.focusEventHandler(event)}
          >
            Tab2
          </button>
          <button
            index={2}
            role="tab"
            aria-selected="false"
            aria-controls="complexcomplex"
            id="complex"
            tabIndex={-1}
            data-deletable
            onKeyDown={event => this.keydownEventListener(event)}
            onClick={event => this.clickEventListener(event)}
            onKeyUp={event => this.keyupEventListener(event)}
            onFocus={event => this.focusEventHandler(event)}
          >
            Tab3
          </button>
        </div>
        <div tabIndex={0} role="tabpanel" id="nils-tab" aria-labelledby="nils">
          <p>
            Nils Frahm is a German musician, composer and record producer based
            in Berlin. He is known for combining classical and electronic music
            and for an unconventional approach to the piano in which he mixes a
            grand piano, upright piano, Roland Juno-60, Rhodes piano, drum
            machine, and Moog Taurus.
          </p>
        </div>
        <div
          tabIndex={0}
          role="tabpanel"
          id="agnes-tab"
          aria-labelledby="agnes"
          hidden
        >
          <p>
            Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first
            album, Philharmonics, was released by PIAS Recordings on 4 October
            2010 in Europe. Philharmonics was certified gold in June 2011 by the
            Belgian Entertainment Association (BEA) for sales of 10,000 Copies.
          </p>
        </div>
        <div
          tabIndex={0}
          role="tabpanel"
          id="complexcomplex"
          aria-labelledby="complex"
          hidden
        >
          <p>Fear of complicated buildings:</p>
          <p>A complex complex complex.</p>
        </div>
      </div>
    );
  }
}

export default AccessabiltyTabs;
