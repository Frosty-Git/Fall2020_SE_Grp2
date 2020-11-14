/**
 * Houses the no-dependency global variables. This lack of 
 * dependencies is important for the backend Node Server to
 * have access to these global variables.
 */

var current_day = 0;
const FIRST_DATE = new Date(2020, 0, 21); //initial date set to February 14th, note months range 0-11
const END_DATE = new Date(2020, 10, 02); //november 2, 2020 
var date = FIRST_DATE;
var current_state = 'USA';
var playClicked = false;    //The play button is currently running
var paused = false;
//const url = 'http://localhost:5000/api/states.geojson';
const url = 'http://localhost:5000/api/USA_Counties.geojson';
const dateURL = 'http://localhost:5000/date-input';
var stateChanged = false;

/* These two shouldn't be here... They are here to make stats work */
//var DATA_LENGTH = 0;


var geoJson;
var stateGeojsons = []; //array containing individual layers at each index for the geometries of each county of the current state
var covid;
var income;
var mymap;

//Used in analysis.js to fill out information for correlation, rather than making a new call to the functions in correlation
var countyIncomes = [];
var countyCase = [];
var usaIncome = [];
var usaCases = [];

