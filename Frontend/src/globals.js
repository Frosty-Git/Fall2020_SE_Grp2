/**
 * Houses the no-dependency global variables. This lack of 
 * dependencies is important for the backend Node Server to
 * have access to these global variables.
 */

var current_day = 0;
var date = 7;
var current_state = 'USA';
var paused = false;
const url = 'http://localhost:5000/api/states.geojson';
//const url = 'http://localhost:5000/api/USA_Counties.geojson';