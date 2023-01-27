// waits til document is ready before calling the functions
$(document).ready(function () {

  // variables
  let calendarEl = $("#calendar");
  let currentDayEl = $("#currentDay");
  let businessHours = {
    start: 9,
    end: 18
  };

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

  // creating the time blocks html elements dynamically

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

  // applying 'past', 'present' and 'future' classes depending on the current time vs timeblock
  function applyTimeClasses() {
    let currentHour = new Date().getHours();
    let timeBlocks = document.querySelectorAll('.time-block');

    timeBlocks.forEach(timeBlock => {
      let hour = timeBlock.id.split('-')[1];
      if (hour < currentHour) {
        timeBlock.classList.add('past');
      } else if (hour === currentHour) {
        timeBlock.classList.add('present');
      } else {
        timeBlock.classList.add('future');
      }
    });
  } // applyTimeClasses()

  // saves the values in localStorage if the user decides to save their event
  $(document).on('click', '.saveBtn', function () {
    let text = $(this).siblings('.description').val();
    let hourIdBlock = $(this).closest('.time-block').attr('id');
    localStorage.setItem(hourIdBlock, text);
  });

  // retrieves the values in the localStorage and displays it in the description
  function retrieveStorage() {
    $('.time-block').each(function () {
      let hourId = $(this).attr('id');
      let savedText = localStorage.getItem(hourId);
      if (savedText) {
        $(this).children('.description').val(savedText);
      }
    });
  };

  createTimeBlocks();
  applyTimeClasses();
  retrieveStorage();

}) // document.ready