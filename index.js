//------------------Required files imports---------------------------

const express = require('express'); //Nodejs express for web server
const path = require('path');       //Nodejs to deal with filepaths
var cors = require('cors');       //Nodejs to enable cors for api
//const { get } = require('http');

//Our database connector object
const db = require('./dbConnection');

//Our main.js file from the frontend. Needed to access current date
const frontend = require('./Frontend/src/globals');

//Members test data
const members = require('./TestingData/Members');
//States test data
const states = require('./TestingData/States');


//----------------End Required files imports-------------------------



//Allows the access to express.js functions
const app = express();

//Allows browser to access the server
app.use(cors());



var currentDate = '2020-11-2';
//----------------Test functions/variables for html communication----
app.use(express.json());



app.post('/date-input', (request, response) => { //request variable is from user input, response is response
    currentDate = (request.body).dateString;
    console.log(currentDate);
});

app.get('/date-input', (req, res) => res.json(currentDate));


//-----------------end html communication------------------------


app.get('/api/USA_Counties.geojson', (request, response) => {
    db.connect(currentDate).then(res => response.json(res));
});






/**
 * Gets the geojson from the database using our database
 * connection object.
 */
// async function getGeojson() {
//     try {
//         var geojson = await db.connect(currentDate);
//         app.get('/api/USA_Counties.geojson', (req, res) => res.json(geojson));
//     }
//     catch(e) {
//         console.log(e);
//     }
// }
// getGeojson();


//----------------------Test Routes----------------------------------
//Remember to delete these and their associated files and require 
//imports before final product.

//Get Members
app.get('/api/members.json', (req, res) => res.json(members));
//console.log(members);

//Get States
app.get('/api/states.geojson', (req, res) => res.json(states));
// console.log(states);

//Get Date Test from DB
async function getDateTest() {
    try {
        var dateTest = await db.connectDateTest();
        app.get('/api/dateTest.json', (req, res) => res.json(dateTest));
    }
    catch(e) {
        console.log(e);
    }
}
//getDateTest();

//--------------------End Test Routes--------------------------------


//Create route for the web server
app.use(express.static(path.join(__dirname, 'public')));

//Setup the port for the web server.
//Server Environment Default Port or Port 5000
const PORT = process.env.PORT || 5000;

//Runs the server. PORT is the Port it is on. The callback let's us
//know that it is running.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));