// -----DOM element variables----- //

// accesses DOM element in which all calendar events will be populated
var container = $('.container'); 



// -----data variables----- //

// initializing the variable that will be used to store calendar
// information, whether it's created fresh or pulling from local storage.
var calendarItems;

// current hour in military time
var currentTime = moment(moment().format('hA'), ['hA']).format('HH');

// empty template for a work day scheduler
var emptySchedule = [
    {
        hour: "9AM",
        description: '',
    },
    {
        hour: "10AM",
        description: '',
    },
    {
        hour: "11AM",
        description: '',
    },
    {
        hour: "12PM",
        description: '',
    },
    {
        hour: "1PM",
        description: '',
    },
    {
        hour: "2PM",
        description: '',
    },
    {
        hour: "3PM",
        description: '',
    },
    {
        hour: "4PM",
        description: '',
    },
    {
        hour: "5PM",
        description: '',
    },
    
];