function getStateAvgMedIncome() {
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
            income += thisProperty.Med_Income; 
            counter++;
        }
    }
    income = (income/counter);
    return income;
}

function getSingleCovid() {
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
            covidCases += thisProperty.Covid_Cases;  
            counter ++;
        }
    }
    return [covidCases, counter];   //returns an array containing both covid cases for the state and total counties in the state
}

