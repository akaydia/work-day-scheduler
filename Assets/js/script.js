// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {


// variables
let calendarEl = $("#calendar");
let currentDayEl = $("#currentDay");
let businessHours = {
  start: 9,
  end: 18
};




  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function createTimeBlocks() {
    for (let i = businessHours.start; i < businessHours.end; i++) {

      // create container elements with the id: hour-xx
      let timeBlock = document.createElement('div');
      timeBlock.setAttribute('id', `hour-${i}`);
      timeBlock.setAttribute('class', 'row time-block')
      calendarEl.append(timeBlock);

      // create the hour to display in AM/PM
      let hour = document.createElement('div');
      hour.setAttribute('class', 'col-2 col-md-1 hour text-center py-3');
      let hourText = i;
      let am_pm = "AM";
  
      
      if (i >= 12) {
        hourText = i - 12;
        am_pm = "PM";
      }

      if (i === 12) {
        hourText = 12;
      } else if (i >= 12) {
        hourText = i - 12;
      }
      hour.textContent = `${hourText} ${am_pm}`;
      timeBlock.append(hour);

      // create the text area to write agenda
      let textarea = document.createElement('textarea');
      textarea.setAttribute('class', 'col-8 col-md-10 description');
      textarea.setAttribute('rows', '3');
      timeBlock.append(textarea);

      // create the save button
      let button = document.createElement('button');
      button.setAttribute('class', 'btn saveBtn col-2 col-md-1');
      button.setAttribute('aria-label', 'save');
      timeBlock.append(button);

      // create the icon
      let icon = document.createElement('i');
      icon.setAttribute('class', 'fas fa-save');
      icon.setAttribute('aria-hidden', 'true');
      button.append(icon);
      
    } // for 9-5
  } // createTimeBlocks

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  // function to add suffix according to the value of the currentDay
  function getOrdinalSuffix(i) {
    let j = i % 10;
    let k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }; // getOrdinalSuffix()

  // presenting the currentDay
  let currentDay = `${dayjs().format('dddd, MMMM ')}${getOrdinalSuffix(dayjs().date())}`;
  currentDayEl.text(currentDay);

  createTimeBlocks();


}) // document.ready