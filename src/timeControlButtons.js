/**
 * JS code to control the function of the HTML buttons.
 */

/* HTML Button functions */
var paused = false;

function pressPlay() {

    paused = false;

    const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

    async function repeatedGreetingsLoop() {
        for (current_day; paused == false && current_day < DATA_LENGTH; current_day++) {
            await sleepNow(1000)
            console.log(current_day);
            covid.resetStyle();
        }
    }

    repeatedGreetingsLoop()
}

function pressPause() {
    paused = true;
    //current_day--;
    console.log(current_day);
    //covid.resetStyle();
}

function pressStop() {
    //current_day = 0;
    paused = true;
    //covid.resetStyle();
}




/* Hello */