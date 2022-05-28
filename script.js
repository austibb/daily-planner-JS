$(function() {
    // all global variables stored in ./assets.js

    // populates page on page load with workday hours, and colors each hour block according to the time passed
    function populatePage() {
        for (hour of calendarItems) {
            // military format of the calendar item hour
            let givenTime = moment(hour.hour, ['hA']).format('HH');
            // creates row object for an hour's timeslot
            let row = $('<div>').addClass('row').data('hour', hour.hour);
            // creates the paragraph element in which the hour is displayed
            let time = $('<p>').addClass('time-block').text(hour.hour);
            // creates div to visually place the time at the left of the row
            let timeContainer = $('<div>').addClass('hour col-sm text-center align-middle');
            // creates field in which the user can view previously scheduled events, and can also edit to create new events
            let description = $('<div>')
                .addClass('description col-sm-10')
                .text(hour.description)
                .attr('contenteditable', 'true');
            // determines what color to set the description field based on the current time
            if (givenTime < currentTime) {
                description.addClass('past');
            } else if (givenTime === currentTime) {
                description.addClass('present');
            } else {
                description.addClass('future');
            }
            // creates save button for each row
            let saveButton = $('<img>')
                .attr('src', './Assets/save_icon.png')
                .addClass('icon fas fa-camera fa-sm');
            let saveContainer = $('<div>').addClass('saveBtn col-sm');

            timeContainer.append(time);   // adds time to the container "column"
            saveContainer.append(saveButton); // adds the save button icon to the save button "column"

            row.append(timeContainer).append(description).append(saveContainer); // appends all three column components to the row element

            container.append(row); // appends hour to the schedule display
        };
    };

    // saves the content of the selected hour slot to local storage.
    function saveChanges() {
        let row = $(this).parent(); // accesses the row element that represents the hour slot being saved

        // updates the description value of the chosen hour row
        for (hour of calendarItems) {
            if (hour.hour == row.data('hour')) {
                hour.description = row.children('.description').text();
            };
        };
        
        // updates local storage object so the changes persist on refresh.
        localStorage.setItem("calendarItems", JSON.stringify(calendarItems));
        // confirms the successful save to the user
        $('#saveStatus').html('Appointment Added to <code>localStorage</code> ✓');
    }

    function init() {
        // retrieves calendar data from local storage, or creates a local storage object from 
        if (localStorage.getItem('calendarItems') === null) {
            calendarItems = emptySchedule;
        } else {
            calendarItems = JSON.parse(localStorage.getItem("calendarItems"));
        };

        // displays current date at the top of the page
        $('#currentDay').text(moment().format('dddd, MMMM Do'));

        // populates schedule with hours
        populatePage();
    }

    container.on('click', '.saveBtn', saveChanges)

    init();
});