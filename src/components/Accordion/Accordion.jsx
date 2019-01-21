import React, { Component } from "react";
import "./Accordion.css";
import "./handleAccordion";

class AccordionComponent extends Component {
  state = {
    accordion: null
  };
  componentDidMount() {
    this.setState({ accordion: document.querySelector(".Accordion") });
  }
  // tiggers = headers
  // panels = bodies
  handleKeyDown = event => {
    // Bind keyboard behaviors on the main accordion container
    const target = event.target;
    var key = event.which.toString();
    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = true && key.match(/33|34/);

    var triggers = Array.prototype.slice.call(
      this.state.accordion.querySelectorAll(".Accordion-trigger")
    );

    var panels = Array.prototype.slice.call(
      target.querySelectorAll(".Accordion-panel")
    );

    // Is this coming from an accordion header?
    // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
    // 38 = Up, 40 = Down
    if (key.match(/38|40/) || ctrlModifier) {
      var index = triggers.indexOf(target);
      var direction = key.match(/34|40/) ? 1 : -1;
      var length = triggers.length;
      var newIndex = (index + length + direction) % length;
      triggers[newIndex].focus();

      event.preventDefault();
    } else if (key.match(/35|36/)) {
      // 35 = End, 36 = Home keyboard operations
      switch (key) {
        // Go to first accordion
        case "36":
          triggers[0].focus();
          break;
        // Go to last accordion
        case "35":
          triggers[triggers.length - 1].focus();
          break;
        default:
          break;
      }

      event.preventDefault();
    } else if (ctrlModifier) {
      // Control + Page Up/ Page Down keyboard operations
      // Catches events that happen inside of panels
      panels.forEach(function(panel, index) {
        if (panel.contains(target)) {
          triggers[index].focus();

          event.preventDefault();
        }
      });
    }
  };
  handleClick = event => {
    var target = event.target;
    var allowMultiple = this.state.accordion.hasAttribute(
      "data-allow-multiple"
    );
    // Allow for each toggle to both open and close individually
    var allowToggle = allowMultiple
      ? allowMultiple
      : this.state.accordion.hasAttribute("data-allow-toggle");

    if (target.classList.contains("Accordion-trigger")) {
      // Check if the current toggle is expanded.
      var isExpanded = target.getAttribute("aria-expanded") === "true";
      var active = this.state.accordion.querySelector('[aria-expanded="true"]');

      // without allowMultiple, close the open accordion
      if (!allowMultiple && active && active !== target) {
        // Set the expanded state on the triggering element
        active.setAttribute("aria-expanded", "false");
        // Hide the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(active.getAttribute("aria-controls"))
          .setAttribute("hidden", "");

        // When toggling is not allowed, clean up disabled state
        if (!allowToggle) {
          active.removeAttribute("aria-disabled");
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute("aria-expanded", "true");
        // Hide the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(target.getAttribute("aria-controls"))
          .removeAttribute("hidden");

        // If toggling is not allowed, set disabled state on trigger
        if (!allowToggle) {
          target.setAttribute("aria-disabled", "true");
        }
      } else if (allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute("aria-expanded", "false");
        // Hide the accordion sections, using aria-controls to specify the desired section
        document
          .getElementById(target.getAttribute("aria-controls"))
          .setAttribute("hidden", "");
      }
      if (!allowToggle) {
        // Get the first expanded/ active accordion
        var expanded = this.state.accordion.querySelector(
          '[aria-expanded="true"]'
        );

        // If an expanded/ active accordion is found, disable
        if (expanded) {
          expanded.setAttribute("aria-disabled", "true");
        }
      }
      event.preventDefault();
    }
  };
  render() {
    return (
      <div onKeyDown={event => this.handleKeyDown(event)}>
        <title>Accordion Example | WAI-ARIA Authoring Practices 1.1</title>

        <main>
          <section>
            <div
              role="separator"
              id="ex_start_sep"
              aria-labelledby="ex_start_sep ex_label"
              aria-label="Start of"
            />
            {/*The <dd> tag is used to describe a term/name in a description list.
                The <dd> tag is used in conjunction with <dl> (defines a description list) and <dt> (defines terms/names).
                Inside a <dd> tag you can put paragraphs, line breaks, images, links, lists, etc. 
                |DL :Definition List ( region that contains panel content.)
                  |DT HEADING
                  |DD REGION (ELEMENTS)
                  |DT HEADING
                  |DD REGION (ELEMENTS)
                  |DT HEADING
                  |DD REGION (ELEMENTS)
                |
                */}
            <div id="coding-arena">
              <div className="demo-block">
                <dl
                  // ROLE: presentation
                  // -Indicates that the dl element is being used to control presentation and does not represent a definition list.
                  // -This implementation uses an HTML definition list where each term is recast as a header and each definition is recast as a region that contains
                  // panel content.
                  id="accordionGroup"
                  role="presentation"
                  className="Accordion"
                  onClick={event => this.handleClick(event)}
                  onKeyDown={event => this.handleKeyDown(event)}
                >
                  <dt
                    // ROLE : heading
                    // Identifies the element as a heading that serves as an accordion header.

                    // ATTRIBUTE : aria-level=3
                    // -Specifies heading level for the accordion header.
                    // -Level 3 is chosen because the accordion is contained in a section with a level 2 heading.
                    role="heading"
                    aria-level={3}
                  >
                    <button
                      // ATTRIBUTE : aria-expanded=true
                      // Set to true when the Accordion panel is expanded, otherwise set to false.

                      // ATTRIBUTE : aria-controls=ID
                      // Points to the ID of the panel which the header controls.

                      // ATTRIBUTE : aria-disabled=true
                      // If the accordion panel is expanded and is not allowed to be collapsed, then set to true.
                      aria-expanded="true"
                      className="Accordion-trigger"
                      aria-controls="sect1"
                      id="accordion1id"
                      type="button"
                    >
                      <span className="Accordion-title">
                        Personal Information
                      </span>
                      <span className="Accordion-icon" />
                    </button>
                  </dt>
                  <dd
                    // ROLE : region
                    // Creates a landmark region that contains the currently expanded accordion panel.

                    // ATTRIBUTE : aria-labelledby="ID_REF"
                    // -Points to the accordion header.
                    // -Labels the landmark region with the accordion header.

                    id="sect1"
                    role="region"
                    aria-labelledby="accordion1id"
                    className="Accordion-panel"
                  >
                    <div>
                      {/* Variable content within section, may include any type of markup or interactive widgets. */}
                      <fieldset>
                        <p>
                          <label htmlFor="cufc1">
                            Name<span aria-hidden="true">*</span>:
                          </label>
                          <input
                            type="text"
                            name="Name"
                            id="cufc1"
                            className="required"
                            aria-required="true"
                          />
                        </p>
                        <p>
                          <label htmlFor="cufc2">
                            Email<span aria-hidden="true">*</span>:
                          </label>
                          <input
                            type="text"
                            name="Email"
                            id="cufc2"
                            aria-required="true"
                          />
                        </p>
                        <p>
                          <label htmlFor="cufc3">Phone:</label>
                          <input type="text" name="Phone" id="cufc3" />
                        </p>
                        <p>
                          <label htmlFor="cufc4">Extension:</label>
                          <input type="text" name="Ext" id="cufc4" />
                        </p>
                        <p>
                          <label htmlFor="cufc5">Country:</label>
                          <input type="text" name="Country" id="cufc5" />
                        </p>
                        <p>
                          <label htmlFor="cufc6">City/Province:</label>
                          <input type="text" name="City_Province" id="cufc6" />
                        </p>
                      </fieldset>
                    </div>
                  </dd>
                  <dt role="heading" aria-level={3}>
                    <button
                      aria-expanded="false"
                      className="Accordion-trigger"
                      aria-controls="sect2"
                      id="accordion2id"
                      type="button"
                    >
                      <span className="Accordion-title">Billing Address</span>
                      <span className="Accordion-icon" />
                    </button>
                  </dt>
                  <dd
                    id="sect2"
                    role="region"
                    aria-labelledby="accordion2id"
                    className="Accordion-panel"
                    hidden
                  >
                    <div>
                      <fieldset>
                        <p>
                          <label htmlFor="b-add1">Address 1:</label>
                          <input type="text" name="b-add1" id="b-add1" />
                        </p>
                        <p>
                          <label htmlFor="b-add2">Address 2:</label>
                          <input type="text" name="b-add2" id="b-add2" />
                        </p>
                        <p>
                          <label htmlFor="b-city">City:</label>
                          <input type="text" name="b-city" id="b-city" />
                        </p>
                        <p>
                          <label htmlFor="b-state">State:</label>
                          <input type="text" name="b-state" id="b-state" />
                        </p>
                        <p>
                          <label htmlFor="b-zip">Zip Code:</label>
                          <input type="text" name="b-zip" id="b-zip" />
                        </p>
                      </fieldset>
                    </div>
                  </dd>
                  <dt role="heading" aria-level={3}>
                    <button
                      aria-expanded="false"
                      className="Accordion-trigger"
                      aria-controls="sect3"
                      id="accordion3id"
                      type="button"
                    >
                      <span className="Accordion-title">Shipping Address</span>
                      <span className="Accordion-icon" />
                    </button>
                  </dt>
                  <dd
                    id="sect3"
                    role="region"
                    aria-labelledby="accordion3id"
                    className="Accordion-panel"
                    hidden
                  >
                    <div>
                      <fieldset>
                        <p>
                          <label htmlFor="m-add1">Address 1:</label>
                          <input type="text" name="m-add1" id="m-add1" />
                        </p>
                        <p>
                          <label htmlFor="m-add2">Address 2:</label>
                          <input type="text" name="m-add2" id="m-add2" />
                        </p>
                        <p>
                          <label htmlFor="m-city">City:</label>
                          <input type="text" name="m-city" id="m-city" />
                        </p>
                        <p>
                          <label htmlFor="m-state">State:</label>
                          <input type="text" name="m-state" id="m-state" />
                        </p>
                        <p>
                          <label htmlFor="m-zip">Zip Code:</label>
                          <input type="text" name="m-zip" id="m-zip" />
                        </p>
                      </fieldset>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div
              role="separator"
              id="ex_end_sep"
              aria-labelledby="ex_end_sep ex_label"
              aria-label="End of"
            />
          </section>
        </main>
      </div>
    );
  }
}

export default AccordionComponent;
