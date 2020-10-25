/**
 * JS code to control the function of the HTML buttons.
 */

/* HTML Button functions */
function pressPlay() {
    current_day++;
    covid.resetStyle();
}

function pressPause() {
    current_day--;
    covid.resetStyle();
}

function pressStop() {
    current_day = 0;
    covid.resetStyle();
}

/* Leaflet Button implementations */



