function getStateAvgMedIncome() {
    countyIncomes = [];
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var income = 0;
    var counter = 0;    //total counties of current state
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyIncome = thisProperty.Med_Income;
            income += countyIncome;
            countyIncomes[counter] = countyIncome;
            counter++;
        }
    }
    income = (income/counter);
    return income
}

function getSingleCovid() {
    countyCase = [];
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var covidCases = 0;
    var counter = 0;
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyCases = thisProperty.cases;
            covidCases += countyCases;
            countyCase[counter] = countyCases;  
            counter ++;
        }
    }
    return [covidCases, counter];   //returns an array containing both covid cases for the state and total counties in the state
}

function getUsaAvgMedIncome() {
    usaIncome = [];
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var income = 0;
    var counter = 0;    //total counties of current state
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        var countyIncome = thisProperty.Med_Income;
        income += countyIncome;
        usaIncome[counter] = countyIncome;
        counter++;
    }
    income = (income/counter);
    return income;
}

function getUsaCovid() {
    usaCases = [];
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var covidCases = 0;
    var counter = 0;
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        var countyCases = thisProperty.cases;
        covidCases += countyCases;
        usaCases[counter] = countyCases;  
        counter ++;
    }
    return [covidCases, counter];   //returns an array containing both covid cases for the state and total counties in the state
}

//yoinked from https://memory.psych.mun.ca/tech/js/correlation.shtml
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

    console.log("Number of counties:" + shortestArrayLength);
    
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


