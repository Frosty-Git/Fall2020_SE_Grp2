const FIRST_DATE_STRING = dateStringFromMilli(Date.parse(FIRST_DATE));
//Date Slider
var slider = document.getElementById("myRange");
//Current Date Text
var dateText = document.getElementById("dateText");

// function pressPlay() {
//     playClicked = true;
//     //console.log(date);
//     var milliDate = Number(Date.parse(date)); //date in millisecond format, 86400000 is one day's worth of time
//     console.log(milliDate);
//     endDateMilli = Number(Date.parse(END_DATE)); //end date in millisecond form

//     paused = false;
//     const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

//     async function delay() {
//         for (milliDate; !paused && milliDate <= endDateMilli; (milliDate += 86400000)) {
//             await sleepNow(1000)
//              if(paused)
//             {
//                 break;
//             }
// //             var milliAsDate = new Date(milliDate);
//             var dateString = dateStringFromMilli(milliAsDate);  //date string needs single quotes for query
//             console.log(dateString);
//             date = new Date(milliAsDate);
//             sendDate();
//             slider.value++;     //Update the date slider bar.
//             updateDateText(dateString);  //update currentDate in html (not working in time needs to wait for date to update fully)
//             if(current_state != 'USA') {
//                 setCurrentState(current_state);     //update the stats box with the same currently selected state, but with new stats for the new date (not working, has to wait for sendState)
//             }
//             else {
//                 setCurrentStateUsa();
//             }
//         }
//     }
//     delay()
// }

function pressPlay() {
    if(playClicked == false) {
        playClicked = true;
        //console.log(date);
        var milliDate = Number(Date.parse(date)); //date in millisecond format, 86400000 is one day's worth of time
        //console.log(milliDate);
        endDateMilli = Number(Date.parse(END_DATE)); //end date in millisecond form

        paused = false;
        const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

        async function delay() {
            while(!paused && milliDate <= endDateMilli) {
                await sleepNow(1000)
                if(paused)
                {
                    break;
                }
                var milliAsDate = new Date(milliDate);
                var dateString = dateStringFromMilli(milliAsDate);  //date string needs single quotes for query
                console.log(dateString);
                
                sendDate();
                date = new Date(milliAsDate);
                slider.value++;     //Update the date slider bar.
                updateDateText(dateString);  //update currentDate in html (not working in time needs to wait for date to update fully)
                
                milliDate += 86400000;
            }
        }
        delay()
    }
}

function dateStringFromMilli(dateMilli) {
    var dateNew = new Date(dateMilli);
    var curr_month = dateNew.getMonth() + 1; //Months are zero based
    var curr_date = dateNew.getDate();
    var curr_year = dateNew.getFullYear();
    var dateString = curr_year + "-" + curr_month + "-" + curr_date;
    //console.log(dateString);
    return dateString;
}

function updateDateText(dateText) {
    document.querySelector(".dateText").innerHTML = dateText;
}

/**
 * The pause button's function. Makes the Covid data stop moving.
 * Stops time from moving forward.
 */
function pressPause() {
    playClicked = false;
    paused = true;
    //console.log(date);
}

/**
 * The stop button's function. Stops the Covid data from moving and
 * resets the current day back to the first day of the data.
 */
function pressStop() {
    pressPause();
    resetDate();
    resetUSA();     //resets zoom back to USA level and removes current state outline
    sendDate();     //reset the map back to initial state of first recorded date
    updateDateText(FIRST_DATE_STRING);
    //console.log(date);
    //Update the date slider bar.
    slider.value = 0;
    //dateText.innerHTML = dateStringFromMilli(Date.parse(date));
}

/**
 * Resets the current day to the first day in the covid data.
 */
async function resetDate() {
    date = FIRST_DATE;
    // date = new Date(2020,9,15);
}

/**
 * Resets the view to the default view and position.
 * Centered on the contiguous USA.
 */
function resetUSA() {
    removeCurrentOutline();
    mymap.setView([39.056882, -98.407468], 5);
    //mymap.flyTo([39.056882, -98.407468], 5);
    setCurrentStateUsa()
}

function setCurrentStateUsa() {
    current_state = 'USA';
    var total = getUsaCovid();   //getSingleCovid returns an array containing total covid cases for a state (array[0]) and the number of counties (array[1])
    //console.log(total[0]);
    var income = getUsaAvgMedIncome();   
    var covidMean =  total[0]/total[1];  //total cases over all counties divided by number of counties
    //console.log("income length: " + usaIncome.length);
    //console.log("cases length: " + usaCases.length);
    var correlation = getPearsonCorrelation(usaIncome, usaCases);
    updateStatisticsBox(total[0], income, covidMean, correlation);
}

/**
 * Changes the view to the input state. Changes the zoom to the 
 * input zoom.
 * 
 * @param {*} stateIndex The state being focused on.
 * @param {*} zoomLevel The default zoom level for the state.
 */
function zoomToState(stateIndex, zoomLevel) {
    stateObject = State_Centroids.features[stateIndex];
    longitude = stateObject.properties.long;
    latitude = stateObject.properties.lat;
    mymap.setView([latitude, longitude], zoomLevel);
    //mymap.flyTo([latitude, longitude], zoomLevel);
}

/**
 * Sets the current state global variable to the state that is
 * currently selected.
 * 
 * @param {*} stateName The new current state being selected.
 */
function setCurrentState(stateName) {
    stateChanged = true;
    current_state = stateName;
    outlineState();
    var total = getSingleCovid();   //getSingleCovid returns an array containing total covid cases for a state (array[0]) and the number of counties (array[1])
    var income = getStateAvgMedIncome();   
    var covidMean =  total[0]/total[1];  //total cases over all counties in the state divided by number of counties
    var correlation = getPearsonCorrelation(countyIncomes, countyCase);
    updateStatisticsBox(total[0], income, covidMean, correlation);
}

function updateStatisticsBox(total, income, mean, correlation) {
    document.querySelector(".statCurrentState").innerHTML = current_state;  //Updates the current state
    document.querySelector(".statTotalCovid").innerHTML = total;            //Updates the covid total
    document.querySelector(".statIncome").innerHTML = "$" + income.toFixed(2);               //Updates the avg median income
    document.querySelector(".covidMean").innerHTML = mean.toFixed(2);                  //Upates the covid mean
    document.querySelector(".correlation").innerHTML = correlation.toFixed(5);
}

//-----------Date Control Slider-----------------

//output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.onchange = function() {
    if(playClicked == true)
    {
        pressPause();   //stop the loop if it is currently playing
    }
    theBigBrainAlgorithm(this.value);
    dateText.innerHTML = dateStringFromMilli(Date.parse(date));
    sendDate();
    
    // if(current_state != 'USA') {
    //     setCurrentState(current_state);     //update the stats box with the same currently selected state, but with new stats for the new date (not working, has to wait for sendState)
    // }
    // else {
    //     setCurrentStateUsa();
    // }
}

//Put algorithm here...
function theBigBrainAlgorithm(sliderValue) {
    const START_MIL_SEC = Date.parse(FIRST_DATE);       //first date in milliseconds
    const MIL_SEC_DAY = 86400000;                       //milliseconds of a single day

    date = new Date(sliderValue * MIL_SEC_DAY + START_MIL_SEC);

}


//-----------End Date Control Slider-----------------

//1581656400000 feb 14th
//add day 86400000

//Send current date to node.js
function sendDate() {
    console.log("Sending date for new geoJson");
    const dateString = dateStringFromMilli(Date.parse(date));
        const data = { dateString }
        const options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(data)
        }
        fetch(dateURL, options).then(response => {
            
            response.json().then(res => {
                try{
                    console.log("Successfully converted to geojson.")
                    //console.log(res);
                    geoJson = res;
                    changeMapLayers(res);
                    if(current_state != 'USA') {
                        setCurrentState(current_state);     //update the stats box with the same currently selected state, but with new stats for the new date (not working, has to wait for sendState)
                    }
                    else {
                        setCurrentStateUsa();
                    }
                }
                catch (error) {
                    console.log("ERROR: failed to convert json")
                }

            })
        });
}

//takes a geojson and uses it to reset the map layers.
function changeMapLayers(geojson) {
    // console.log(geoJson);
    
    mymap.removeLayer(covid); //This is not removing the layer...

    layerControls.removeLayer(covid);
    covid = L.geoJson(geojson, {style: styleCovid});

    layerControls.addBaseLayer(covid, "Covid");

    if(currentLayerID != 3165){  //income is not currently selected, 3165 is income layer's id
        mymap.addLayer(covid);
    }
}

function outlineState() {
    if(stateChanged == true) {
        removeCurrentOutline();
    }
    stateChanged = false;
    if(current_state != 'USA') {
        var geoFeatures = geoJson.features;
        var index = 0;
        var length = geoFeatures.length
        var counter = 0;    //total counties of current state
        for (; index < length; index++) {
            var thisProperty = geoFeatures[index].properties;    //this current county's properties
            if (thisProperty.STATE_NAME == current_state) {
                stateGeojsons[counter] = L.geoJson(geoFeatures[index], {style: styleState});    //create a layer from the current county's features and add it to the state's array of layers
                counter++;
            }
        }
        //console.log(stateGeojsons.length)
        index = 0;
        for(; index < counter; index++)
        {
            stateGeojsons[index].addTo(mymap)   //add the layer for each county to the map

        }
    } 
}

//remove the layers for the currently selected state
function removeCurrentOutline() {
    if(stateGeojsons.length > 0)
    {
        var i = 0;
        var geoLength = stateGeojsons.length;
        for(; i < geoLength; i++)
        {
            mymap.removeLayer(stateGeojsons[i]);
        }
    }
}