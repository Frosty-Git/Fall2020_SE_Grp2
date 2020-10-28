/**
 * JS code to control the function of the HTML buttons.
 */

/* HTML Button functions */
var paused = false;

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

function pressPause() {
    paused = true;
    console.log(current_day);
}

function pressStop() {
    pressPause();
    resetDay();
    console.log(current_day);
    covid.resetStyle();
}

async function resetDay() {
    current_day = 0;
}

function zoomToState(stateName) {
    stateObject = State_Centroids.features[1]
    longitude = stateObject.properties.long
    latitude = stateObject.properties.lat
    mymap.setView([latitude, longitude], 7);
}
