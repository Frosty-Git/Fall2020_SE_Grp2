/**
 * JS code to control the function of the HTML buttons.
 */

var paused = false;

/**
 * The play button's function. Makes the Covid data start moving
 * forward in time starting with the current day.
 */
function pressPlay() {

    paused = false;

    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    async function delay() {
        for (current_day; paused == false && current_day < DATA_LENGTH; current_day++) {
            await sleepNow(1000)
            console.log(current_day);
            covid.resetStyle();
        }
    }

    delay()
}

/**
 * The pause button's function. Makes the Covid data stop moving.
 * Stops time from moving forward.
 */
function pressPause() {
    paused = true;
    console.log(current_day);
}

/**
 * The stop button's function. Stops the Covid data from moving and
 * resets the current day back to the first day of the data.
 */
function pressStop() {
    pressPause();
    resetDay();
    console.log(current_day);
    covid.resetStyle();
}

/**
 * Resets the current day to the first day in the covid data.
 */
async function resetDay() {
    current_day = 0;
}

/**
 * Resets the view to the default view and position.
 * Centered on the contiguous USA.
 */
function resetZoom() {
    mymap.setView([39.056882, -98.407468], 5);
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
}

function setStatCurrentState() {
    var text = document.querySelector(".statCurrentState");
    console.log(text)
    document.querySelector(".statCurrentState").innerHTML = current_state;
}