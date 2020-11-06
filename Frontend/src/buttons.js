/**
 * JS code to control the function of the HTML buttons.
 */

/**
 * The play button's function. Makes the Covid data start moving
 * forward in time starting with the current day.
 */
// function pressPlay() {

//     paused = false;

//     const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

//     async function delay() {
//         for (current_day; paused == false && current_day < DATA_LENGTH; current_day++) {
//             await sleepNow(1000)
//             console.log(current_day);
//             covid.resetStyle();
//         }
//     }

//     delay()
// }
const FIRST_DATE_STRING = dateStringFromMilli(Date.parse(FIRST_DATE));

function pressPlay() {
    //console.log(date);
    var milliDate = Number(Date.parse(date)); //date in millisecond format, 86400000 is one day's worth of time
    console.log(milliDate);
    endDateMilli = Number(Date.parse(new Date(2020, 10, 02))); //november 2, 2020 in millisecond form

    paused = false;
    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    async function delay() {
        for (milliDate; !paused && milliDate < endDateMilli; (milliDate += 86400000)) {
            await sleepNow(1000)
            var milliAsDate = new Date(milliDate);
            var dateString = dateStringFromMilli(milliAsDate);  //date string needs single quotes for query
            updateDateText(dateString);  //update currentDate in html
            console.log(dateString);
            date = new Date(milliAsDate);
            //console.log(date);
            covid.resetStyle();
        }
    }
    delay()
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
    document.querySelector(".currentDate").innerHTML = dateText;
}

/**
 * The pause button's function. Makes the Covid data stop moving.
 * Stops time from moving forward.
 */
function pressPause() {
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
    updateDateText(FIRST_DATE_STRING);
    console.log(date);
    covid.resetStyle();
}

/**
 * Resets the current day to the first day in the covid data.
 */
async function resetDate() {
    date = FIRST_DATE;
}

/**
 * Resets the view to the default view and position.
 * Centered on the contiguous USA.
 */
function resetUSA() {
    mymap.setView([39.056882, -98.407468], 5);
    current_state = 'USA';
    setStatCurrentState();
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
}

/**
 * Sets the current state global variable to the state that is
 * currently selected.
 * 
 * @param {*} stateName The new current state being selected.
 */
function setCurrentState(stateName) {
    current_state = stateName;
    setStatCurrentState();
    var total = getSingleCovid();   //getSingleCovid returns an array containing total covid cases for a state (array[0]) and the number of counties (array[1])
    var income = getStateAvgMedIncome();   
    var covidMean =  total[0]/total[1];  //total cases over all counties divided by number of counties
    setStatTotalCovid(total[0]);
    setStatIncome(income);
    setCovidMean(covidMean);
}

function setStatCurrentState() {
    document.querySelector(".statCurrentState").innerHTML = current_state;
}

function setStatTotalCovid(total) {
    document.querySelector(".statTotalCovid").innerHTML = total;
}

function setStatIncome(income) {
    document.querySelector(".statIncome").innerHTML = income;
}

function setCovidMean(mean) {
    document.querySelector(".covidMean").innerHTML = mean;
}

function toggleSidebar(ref){
    document.getElementById("sidebar").classList.toggle('active');
}