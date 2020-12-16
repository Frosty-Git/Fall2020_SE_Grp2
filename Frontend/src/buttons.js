// Initial date (January 21, 2020) represented in string form
const FIRST_DATE_STRING = dateStringFromMilli(Date.parse(FIRST_DATE));
// Represents the current slider value, which corresponds to current date
var slider = document.getElementById("myRange");
// Current value of date (housed in the header)
var dateText = document.getElementById("dateText");

/**
 * This function is called when the play button is pressed. It updates
 * the geoJson to the next date and updates the value/date reflected
 * in the slider bar.
 */
function pressPlay() {
    if(playClicked == false) {
        playClicked = true;
        // Current date in milliseconds (number only)
        var milliDate = Number(Date.parse(date));
        // End date in millisecond form (number only)
        endDateMilli = Number(Date.parse(END_DATE)); 

        paused = false;
        // Allows the thread to sleep
        const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

        async function delay() {
            while(!paused && milliDate <= endDateMilli) {
                await sleepNow(1000);    // Sleep for 1 second
                if(paused)
                {
                    break;
                }
                // Number-only milliseconds converted to Date object
                var milliAsDate = new Date(milliDate);
                // Date as a string (formatted for querying and display)
                var dateString = dateStringFromMilli(milliAsDate);
                
                sendDate();
                date = new Date(milliAsDate);   // Update global date
                slider.value++;                 // Update the slider bar value
                updateDateText(dateString);     // Update date displayed in header
                // 86400000 is one day's worth of time in milliseconds
                milliDate += 86400000;
            }
        }
        delay();
    }
}

/**
 * Creates a date in String format for use in the query and for display in the
 * header
 * 
 * @param   dateMilli   A Date object in millisecond form
 * @returns             The date as a String
 */
function dateStringFromMilli(dateMilli) {
    var dateNew = new Date(dateMilli);
    var curr_month = dateNew.getMonth() + 1; // Months are zero based
    var curr_date = dateNew.getDate();
    var curr_year = dateNew.getFullYear();
    var dateString = curr_year + "-" + curr_month + "-" + curr_date;
    return dateString;
}

/**
 * Updates the date in the header.
 * 
 * @param   dateString  An already formatted date as a String
 */
function updateDateText(dateString) {
    document.querySelector(".dateText").innerHTML = dateString;
}

/**
 * The pause button's function. Makes the Covid data stop moving.
 * Stops time from moving forward.
 */
function pressPause() {
    playClicked = false;
    paused = true;
}

/**
 * The reset button's function. Stops the Covid data from moving and
 * resets the current day back to the first day of the data.
 */
function pressReset() {
    pressPause();
    // Resets the current day to the first day in the covid data (January 21, 2020).
    date = FIRST_DATE;
    // Resets zoom back to USA level and removes current state outline
    resetUSA();     
    sendDate();     // Resets map back to initial state of first recorded date
    updateDateText(FIRST_DATE_STRING);
    // Resets the slider bar back to 0.
    slider.value = 0;
}

/**
 * Resets the view to the default view and position.
 * Centered on the contiguous USA.
 */
function resetUSA() {
    removeCurrentOutline();
    mymap.setView([39.056882, -98.407468], 5);
    setCurrentStateUsa()
}

/**
 * Sets the currently selected state to USA. Updates the stats to reflect this
 * change.
 */
function setCurrentStateUsa() {
    current_state = 'USA';
    /* getUSACovid returns an array containing total covid cases for the US
       (array[0]) and the number of counties (array[1]) */
    var total = getUsaCovid();
    var income = getUsaAvgMedIncome(); 
    // Total cases over all counties divided by number of counties  
    var covidMean =  total[0]/total[1];
    var correlation = getPearsonCorrelation(usaIncome, usaCases);
    updateStatisticsBox(total[0], income, covidMean, correlation);
}

/**
 * Changes the view to the input state. Changes the zoom to the 
 * input zoom.
 * 
 * @param   stateIndex  The index of the state selected
 * @param   zoomLevel   The zoom level for the state
 */
function zoomToState(stateIndex, zoomLevel) {
    stateObject = State_Centroids.features[stateIndex];
    longitude = stateObject.properties.long;
    latitude = stateObject.properties.lat;
    mymap.setView([latitude, longitude], zoomLevel);
}

/**
 * Sets the state global variable to the state that is currently selected.
 * 
 * @param   stateName   The new current state being selected.
 */
function setCurrentState(stateName) {
    stateChanged = true;
    current_state = stateName;
    outlineState();
    /* getSingleCovid returns an array containing total covid cases for a state
       (array[0]) and the number of counties (array[1]) */
    var total = getSingleCovid();   
    var income = getStateAvgMedIncome();  
    // Total cases over all counties in the state divided by number of counties 
    var covidMean =  total[0]/total[1];  
    var correlation = getPearsonCorrelation(countyIncomes, countyCase);
    updateStatisticsBox(total[0], income, covidMean, correlation);
}

/**
 * Updates the statistics box to reflect the numbers for the currently selected
 * state.
 * 
 * @param   total       Total covid cases of current state 
 * @param   income      Average median income
 * @param   mean        The average cases per county
 * @param   correlation Correlation between income and covid cases
 */
function updateStatisticsBox(total, income, mean, correlation) {
    // Updates the current state
    document.querySelector(".statCurrentState").innerHTML = current_state;  
    // Updates the covid total
    document.querySelector(".statTotalCovid").innerHTML = total;   
    // Updates the avg median income 
    document.querySelector(".statIncome").innerHTML = "$" + income.toFixed(2); 
    // Upates the covid mean              
    document.querySelector(".covidMean").innerHTML = mean.toFixed(2);   
    // Updates the correlation               
    document.querySelector(".correlation").innerHTML = correlation.toFixed(5);
}

/**
 * Updates the current slider value (each time you drag the slider handle)
 */
slider.onchange = function() {
    if(playClicked == true)
    {
        pressPause();   // Stop the loop if it is currently playing
    }
    updateSlider(this.value);
    // Updates the date in the header
    dateText.innerHTML = dateStringFromMilli(Date.parse(date));
    sendDate();
}

/**
 * Updates the slider to a new value. Updates the global date value with
 * the value it corresponds to in the slider. This relationship is reflected
 * in (sliderValue * MIL_SEC_DAY + START_MIL_SEC).
 * 
 * @param   sliderValue     The value the slider is updated to
 */
function updateSlider(sliderValue) {
    // First date in milliseconds
    const START_MIL_SEC = Date.parse(FIRST_DATE);       
    // 86400000 is the milliseconds of a single day
    const MIL_SEC_DAY = 86400000;                       
    /*
        The slider value ranges from 0 to 315, each of which correspond to a
        day in the year. The first day is 0, and the last day is 315. To convert
        between the slider value and the real day, you must multiply the current
        value by the number of milliseconds in a single day. Then, in order to
        obtain the true current day you must add the milliseconds of the first
        day.
    */
    date = new Date(sliderValue * MIL_SEC_DAY + START_MIL_SEC);

}

/**
 * Sends current date to node.js. Makes a query that returns a formatted geoJson
 * reflecting the data for current date.
 */
function sendDate() {
    const dateString = dateStringFromMilli(Date.parse(date));
    /*
        Date in String format as a JavaScript object; used to create a json that
        is stringified for querying
    */
    const data = { dateString };
    // Sets the options for the fetch
    const options = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Converts date json to String for query
    }
    /*
        Fetches from the node server using the date at dateURL. The response is
        the new geoJson for the map at said date.
    */
    fetch(dateURL, options).then(response => {       
        response.json().then(res => {
            try {
                console.log("Successfully converted to geojson.");
                /*
                    Updates global geoJson to the geoJson from the result of the
                    query.
                */
                geoJson = res;  
                changeMapLayers(res);
                if(current_state != 'USA') {
                    /*
                        Update the stats box with the same currently
                        selected state, but with new stats for the new date.
                    */
                    setCurrentState(current_state);     
                }
                else {
                    /*
                        Update the stats box still for USA, but with new stats
                        for the new date.
                    */
                    setCurrentStateUsa();
                }
            }
            catch (error) {
                console.log("ERROR: failed to convert json");
            }
        })
    });
}

/**
 * Takes a geojson and uses it to set the map layers. The function is used
 * when date is updated, thus the map must change to reflect the data for this
 * date.
 * 
 * @param   geojson     The geoJson used to update the map's layers
 */
function changeMapLayers(geojson) {
    mymap.removeLayer(covid); 
    layerControls.removeLayer(covid);
    covid = L.geoJson(geojson, {style: styleCovid});
    layerControls.addBaseLayer(covid, "Covid");
    /*
        Income layer is not currently selected; 3165 is Income layer's id
        Note: the Income layer never changes since it is static throughout all
        dates, so only the Covid layer will need to update if selected.
    */
    if(currentLayerID != 3165) {
        mymap.addLayer(covid);
    }
}

/**
 * Outlines the currently selected state (if it's not USA) in red.
 */
function outlineState() {
    if(stateChanged == true) {
        // Remove the outline for the previous state since is no longer selected
        removeCurrentOutline();
    }
    stateChanged = false;
    if(current_state != 'USA') {
        // Represents all counties in the current state
        var geoFeatures = geoJson.features;
        var index = 0;
        var length = geoFeatures.length
        var counter = 0;    // Represents the total counties of current state
        for (; index < length; index++) {
            /* 
                geoFeatures[index].properties is this current county's
                properties. Checks that the name of the county's state matches
                that of the current state.
            */
            if (geoFeatures[index].properties.STATE_NAME == current_state) {
                /*
                    Creates a layer from the current county and adds it to the
                    state's array of layers. There is a layer for each county,
                    which will altogether make up the outline.
                */
                stateGeojsons[counter] = L.geoJson(geoFeatures[index], {style: styleState});
                counter++;
            }
        }
        index = 0;
        for(; index < counter; index++)
        {
            // Add the layer for each county to the map
            stateGeojsons[index].addTo(mymap)
        }
    } 
}

/**
 * Removes the outline of a state. Function is used when the state selected is
 * changed.
 */
function removeCurrentOutline() {
    var geoLength = stateGeojsons.length;
    /*
        A length greater than 0 means a state is selected and has at least 1
        county to remove an outline for.
    */
    if(geoLength > 0)
    {
        for(var i = 0; i < geoLength; i++)
        {
            mymap.removeLayer(stateGeojsons[i]);
        }
    }
}