//------------------Required files imports---------------------------

// Nodejs express for web server
const express = require('express');
// Nodejs to deal with filepaths
const path = require('path');
// Nodejs to enable cors for api   
var cors = require('cors');
// Our database connector object
const db = require('./dbConnection');

//----------------End Required files imports-------------------------



//-------------------Express Setup-----------------------------------

// Allows the access to express.js functions
const app = express();
// Allows browser to access the server
app.use(cors());
// Allows express app to be able to interact with json data
app.use(express.json());
// The current date for database queries
var currentDate = '2020-1-21';

//-----------------End Express Setup---------------------------------



//----------------------------Routes---------------------------------

/*
    Post Route for when the current date changes on the client.
    request variable is from user input, response is response
*/
app.post('/date-input', (request, response) => { 
    currentDate = (request.body).dateString;
    console.log("New current date: " + currentDate);
    db.connect(currentDate).then((resolve, reject) => {
        try{
            response.json(resolve);
            console.log("Response sent to client");
        }
        catch(error) {
            console.log("ERROR: Failed to post data.");
            console.log(error);
        }
    });
    
});

/*
    Get Route that provides the server's current date variable value.
*/
app.get('/date-input', (req, res) => res.json(currentDate));

/*
    Get Route which queries the database for USA_Counties.geojson at
    the current date variable's value. Provides that geojson to the
    client.
*/
app.get('/api/USA_Counties.geojson', (request, response) => {
    db.connect(currentDate).then(res => response.json(res));
});

//--------------------------End Routes-------------------------------

/*  
    Setup the port for the web server.
    Server Environment Default Port or Port 5000
*/
const PORT = process.env.PORT || 5000;

/*
    Runs the server. PORT is the Port it is on. The callback let's us
    know that it is running.
*/
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));