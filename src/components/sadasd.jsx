/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/

'use strict';

Array.prototype.slice.call(document.querySelectorAll('.Accordion'))//array.prototype.slice.call : turns nodelist into actual array to use map https://stackoverflow.com/questions/19099170/what-does-array-prototype-slice-call-wrapper-queryselectorall-do
.forEach(
  function (accordion) {//gets each element in array so accordion is just one of all the array
  // Allow for multiple accordion sections to be expanded at the same time
  var allowMultiple = accordion.hasAttribute('data-allow-multiple');
  // Allow for each toggle to both open and close individually
  var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

  // Create the array of toggle elements for the accordion group
  var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-trigger'));//get all headers
  var panels = Array.prototype.slice.call(accordion.querySelectorAll('.Accordion-panel'));//get all bodies

  accordion.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('Accordion-trigger')) {
      // Check if the current toggle is expanded.
      var isExpanded = target.getAttribute('aria-expanded') == 'true';
      var active = accordion.querySelector('[aria-expanded="true"]');

      // without allowMultiple, close the open accordion
      if (!allowMultiple && active && active !== target) {
        // Set the expanded state on the triggering element
        active.setAttribute('aria-expanded', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');

        // When toggling is not allowed, clean up disabled state
        if (!allowToggle) {
          active.removeAttribute('aria-disabled');
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'true');
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');

        // If toggling is not allowed, set disabled state on trigger
        if (!allowToggle) {
          target.setAttribute('aria-disabled', 'true');
        }
      }
      else if (allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
      }

      event.preventDefault();
    }
  });

  // Bind keyboard behaviors on the main accordion container
  accordion.addEventListener('keydown', function (event) {
    var target = event.target;
    var key = event.which.toString();//which contains the key pressed down
    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Is this coming from an accordion header?
    if (target.classList.contains('Accordion-trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        var index = triggers.indexOf(target);
        var direction = (key.match(/34|40/)) ? 1 : -1;
        var length = triggers.length;
        var newIndex = (index + length + direction) % length;

        triggers[newIndex].focus();

        event.preventDefault();
      }
      else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            triggers[0].focus();
            break;
            // Go to last accordion
          case '35':
            triggers[triggers.length - 1].focus();
            break;
        }

        event.preventDefault();//prevents deafult of this event
      }
    }
    else if (ctrlModifier) {
      // Control + Page Up/ Page Down keyboard operations
      // Catches events that happen inside of panels
      panels.forEach(function (panel, index) {
        if (panel.contains(target)) {
          triggers[index].focus();

          event.preventDefault();
        }
      });
    }
  });

  // Minor setup: will set disabled state, via aria-disabled, to an
  // expanded/ active accordion which is not allowed to be toggled close
  if (!allowToggle) {
    // Get the first expanded/ active accordion
    var expanded = accordion.querySelector('[aria-expanded="true"]');

    // If an expanded/ active accordion is found, disable
    if (expanded) {
      expanded.setAttribute('aria-disabled', 'true');
    }
  }

});


<div class="demo-block">
  <dl id="accordionGroup"
      role="presentation"
      class="Accordion">
    <dt role="heading" aria-level="3">
      <button aria-expanded="true"
              class="Accordion-trigger"
              aria-controls="sect1"
              id="accordion1id"
              type="button">
        <span class="Accordion-title">
          Personal Information
        </span>
        <span class="Accordion-icon"></span>
      </button>
    </dt>
    <dd id="sect1"
        role="region"
        aria-labelledby="accordion1id"
        class="Accordion-panel">
      <div>
        <!-- Variable content within section, may include any type of markup or interactive widgets. -->
        <fieldset>
          <p>
            <label for="cufc1">
              Name
              <span aria-hidden="true">
                *
              </span>
              :
            </label>
            <input type="text"
                   value=""
                   name="Name"
                   id="cufc1"
                   class="required"
                   aria-required="true">
          </p>
          <p>
            <label for="cufc2">
              Email
              <span aria-hidden="true">
                *
              </span>
              :
            </label>
            <input type="text"
                   value=""
                   name="Email"
                   id="cufc2"
                   aria-required="true">
          </p>
          <p>
            <label for="cufc3">
              Phone:
            </label>
            <input type="text"
                   value=""
                   name="Phone"
                   id="cufc3">
          </p>
          <p>
            <label for="cufc4">
              Extension:
            </label>
            <input type="text"
                   value=""
                   name="Ext"
                   id="cufc4">
          </p>
          <p>
            <label for="cufc5">
              Country:
            </label>
            <input type="text"
                   value=""
                   name="Country"
                   id="cufc5">
          </p>
          <p>
            <label for="cufc6">
              City/Province:
            </label>
            <input type="text"
                   value=""
                   name="City_Province"
                   id="cufc6">
          </p>
        </fieldset>
      </div>
    </dd>
    <dt role="heading" aria-level="3">
      <button aria-expanded="false"
              class="Accordion-trigger"
              aria-controls="sect2"
              id="accordion2id"
              type="button">
        <span class="Accordion-title">
          Billing Address
        </span>
        <span class="Accordion-icon"></span>
      </button>
    </dt>
    <dd id="sect2"
        role="region"
        aria-labelledby="accordion2id"
        class="Accordion-panel"
        hidden="">
      <div>
        <fieldset>
          <p>
            <label for="b-add1">
              Address 1:
            </label>
            <input type="text"
                   name="b-add1"
                   id="b-add1">
          </p>
          <p>
            <label for="b-add2">
              Address 2:
            </label>
            <input type="text"
                   name="b-add2"
                   id="b-add2">
          </p>
          <p>
            <label for="b-city">
              City:
            </label>
            <input type="text"
                   name="b-city"
                   id="b-city">
          </p>
          <p>
            <label for="b-state">
              State:
            </label>
            <input type="text"
                   name="b-state"
                   id="b-state">
          </p>
          <p>
            <label for="b-zip">
              Zip Code:
            </label>
            <input type="text"
                   name="b-zip"
                   id="b-zip">
          </p>
        </fieldset>
      </div>
    </dd>
    <dt role="heading" aria-level="3">
      <button aria-expanded="false"
              class="Accordion-trigger"
              aria-controls="sect3"
              id="accordion3id"
              type="button">
        <span class="Accordion-title">
          Shipping Address
        </span>
        <span class="Accordion-icon"></span>
      </button>
    </dt>
    <dd id="sect3"
        role="region"
        aria-labelledby="accordion3id"
        class="Accordion-panel"
        hidden="">
      <div>
        <fieldset>
          <p>
            <label for="m-add1">
              Address 1:
            </label>
            <input type="text"
                   name="m-add1"
                   id="m-add1">
          </p>
          <p>
            <label for="m-add2">
              Address 2:
            </label>
            <input type="text"
                   name="m-add2"
                   id="m-add2">
          </p>
          <p>
            <label for="m-city">
              City:
            </label>
            <input type="text"
                   name="m-city"
                   id="m-city">
          </p>
          <p>
            <label for="m-state">
              State:
            </label>
            <input type="text"
                   name="m-state"
                   id="m-state">
          </p>
          <p>
            <label for="m-zip">
              Zip Code:
            </label>
            <input type="text"
                   name="m-zip"
                   id="m-zip">
          </p>
        </fieldset>
      </div>
    </dd>
  </dl>
</div>