function getStateAvgMedIncome() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var income = 0;
    var counter = 0;    //total counties of current state
    var allCountyIncomes = [];
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyIncome = thisProperty.Med_Income;
            income += countyIncome;
            allCountyIncomes[counter] = countyIncome;
            counter++;
        }
    }
    income = (income/counter);
    return [income, allCountyIncomes];
}

function getSingleCovid() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var covidCases = 0;
    var counter = 0;
    var allCountyCases = [];
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            var countyCases = thisProperty.cases;
            covidCases += countyCases;
            allCountyCases[counter] = countyCases;  
            counter ++;
        }
    }
    return [covidCases, counter, allCountyCases];   //returns an array containing both covid cases for the state and total counties in the state
}

function getCorrelation() {
    var allIncome = getStateAvgMedIncome();
    var allCases = getSingleCovid();
    var incomeArray = allIncome[1];
    var covidArray = allCases[2];
    var correlation = getPearsonCorrelation(incomeArray, covidArray);
    return correlation;
}

function getUsaAvgMedIncome() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var income = 0;
    var counter = 0;    //total counties of current state
    var incomesUSA = [];
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        var countyIncome = thisProperty.Med_Income;
        income += countyIncome;
        incomesUSA[counter] = countyIncome;
        counter++;
    }
    income = (income/counter);
    return [income, incomesUSA];
}

function getUsaCovid() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var covidCases = 0;
    var counter = 0;
    var usaCases = [];
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        var countyCases = thisProperty.cases;
        covidCases += countyCases;
        usaCases[counter] = countyCases;  
        counter ++;
    }
    return [covidCases, counter, usaCases];   //returns an array containing both covid cases for the state and total counties in the state
}

function getUsaCorrelation() {
    var allIncome = getUsaAvgMedIncome();
    var allCases = getUsaCovid();
    var incomeArray = allIncome[1];
    var covidArray = allCases[2];
    var correlation = getPearsonCorrelation(incomeArray, covidArray);
    return correlation;
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


