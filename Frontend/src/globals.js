/**
 * Houses the no-dependency global variables. This lack of dependencies is 
 * important for the backend Node Server and a few other JavaScript files to
 * have access to these global variables.
 */

/*
    Initial date set to January 21, 2020 (the day of the first recorded case).
    Note months range 0-11 in JavaScript.
*/
const FIRST_DATE = new Date(2020, 0, 21);

// December 1, 2020 is the final selected day in our data.
const END_DATE = new Date(2020, 11, 01); 

// Initially set to first date, but is changed as the user interacts with the UI
var date = FIRST_DATE;

// Initially set to USA, but is changed as the user interacts with the UI
var current_state = 'USA';

/*
    Indicates if the play button was clicked, meaning its loop is currently
    running. This information is important for pausing and updating the value
    of the slider. Before making this update, the loop would always go an
    extra day after pause was selected.
*/
var playClicked = false;  

// Indicates if the pause button was clicked. 
var paused = false;

// Contains the geoJson returned from the Node server query
const url = 'http://localhost:5000/api/USA_Counties.geojson';

/*
    Stores the current date as a String for use in a fetch in sendDate() for
    querying.
*/
const dateURL = 'http://localhost:5000/date-input';

/*
    Indicates if a state was changed. Used to determine the addition and removal
    of a state's county outlines.
*/
var stateChanged = false;

/*
    Array containing individual layers at each index for the geometries of each
    county of the current state. Is used for the addition and removal of a
    state's county outline layers.
*/
var stateGeojsons = []; 

// The geoJson of the U.S. on the current date.
var geoJson;

/*
    Each index is the median income for a single county in the currently 
    selected state.
*/
var countyIncomes = [];

/*
    Each index is the number of covid cases for a single county in the currently 
    selected state.
*/
var countyCase = [];

/*
    Each index is the median income for a single county in the U.S. on the
    current date.
*/
var usaIncome = [];

/*
    Each index is the number of covid cases for a single county in the U.S. on
    the current date.
*/
var usaCases = [];

// Map's layer for covid cases in the US on a single date
var covid;

// Map's layer for income in the US (static across all dates) 
var income;

// The map
var mymap;

// Contains all the map layers mentioned above.
let overlayMaps;

/*
    Button on the map containing the buttons to select a specific layer from
    overlayMaps.
*/
let layerControls;

/*
    Currently selected layer's ID, note the Income layer's ID is always 3165
    since it is never removed and recreated. The creation/recreation of layer
    creates a new ID.
*/
let currentLayerID; 

