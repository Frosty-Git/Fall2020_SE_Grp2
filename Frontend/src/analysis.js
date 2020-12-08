/**
 * Calculates the average median income for a state using the data for each
 * individual county's median income in the state.
 * 
 * @returns     The average median income for the state.
 */
function getStateAvgMedIncome() {
    /*
        Resets countyIncomes to empty in order to get rid of previous state's
        data.
    */
    countyIncomes = [];
    var allFeatures = geoJson.features; // Array of all county features
    var length = allFeatures.length
    var income = 0;
    var counter = 0;    // Represents the total counties of current state
    for(var index = 0; index < length ; index++)
    {
        // The properties of the current county (at index)
        var thisProperty = allFeatures[index].properties;
        // Only count a county's data if it is contained in the current state  
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyIncome = thisProperty.Med_Income;
            income += countyIncome;
            countyIncomes[counter] = countyIncome;
            counter++;
        }
    }
    income = (income/counter);  // Total median income divided by # of counties
    return income
}

/**
 * Totals all covid cases for each county in the currently selected state.
 * 
 * @returns     An array containing the total covid cases at index 0 and the 
 *              total counties in the state at index 1. This information is
 *              relevant when the current state and its stats are updated, as
 *              both numbers are used to calculate the average number of cases
 *              per county.
 */
function getSingleCovid() {
    /*
        Resets countyCase to empty in order to get rid of previous state's or 
        previous date's data
    */
    countyCase = [];
    var index = 0;
    var allFeatures = geoJson.features;   // Array of all county features 
    var length = allFeatures.length
    var covidCases = 0;
    var counter = 0;    // Represents the total counties of current state
    for( ; index < length ; index++)
    {
        // The properties of the current county (at index)
        var thisProperty = allFeatures[index].properties;
        // Only count a county's data if it is contained in the current state
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyCases = thisProperty.cases;
            covidCases += countyCases;
            countyCase[counter] = countyCases;  
            counter ++;
        }
    }
    return [covidCases, counter];
}

/**
 * Calculates the average median income for the U.S. using the data for each
 * individual county's median income in the country.
 * 
 * @returns     The average median income for the U.S.
 */
function getUsaAvgMedIncome() {
    // Resets usaIncome to empty in order to get rid of previous date's data.
    usaIncome = [];
    var allFeatures = geoJson.features;    // Array of all county features
    var length = allFeatures.length
    var income = 0;
    for(var index = 0; index < length ; index++)
    {
        // The properties of the current county (at index)
        var thisProperty = allFeatures[index].properties;   
        var countyIncome = thisProperty.Med_Income;
        income += countyIncome;
        usaIncome[index] = countyIncome;
    }
    income = (income/index);
    return income;
}

/**
 * Totals all covid cases for each county in the United States.
 * 
 * @returns     An array containing the total covid cases at index 0 and the 
 *              total counties in the U.S. at index 1. This information is
 *              relevant when the stats are updated, as both numbers are used to
 *              calculate the average number of cases per county.
 */
function getUsaCovid() {
    // Resets usaCases to empty in order to get rid of previous date's data
    usaCases = [];
    var allFeatures = geoJson.features;    // Array of all county features
    var length = allFeatures.length
    var covidCases = 0;
    for(var index = 0; index < length; index++)
    {
        // The properties of the current county (at index)
        var thisProperty = allFeatures[index].properties;    
        var countyCases = thisProperty.cases;
        covidCases += countyCases;
        usaCases[index] = countyCases;  
    }
    return [covidCases, index];
}

/**
 * Calculates the correlation between the numbers in two arrays of equal lengths
 * Source: https://memory.psych.mun.ca/tech/js/correlation.shtml
 * 
 * @returns     The correlation value
 */
function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0; 
    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }
    var xy = [];
    var x2 = [];
    var y2 = [];
    for(var i=0; i<shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;
    for(var i=0; i< shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }
    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer;
    if(shortestArrayLength > 1) {
        answer = step1 / step4;
    }
    else { 
        answer = "Not applicable"
    } 
    return answer;
}


