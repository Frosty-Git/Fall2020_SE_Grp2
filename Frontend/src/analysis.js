function getStateAvgMedIncome() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var incomeArray = [];
    var counter = 0;    //total counties of current state
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            incomeArray[counter] = thisProperty.Med_Income;  //add this county's median income to income array
            counter++;
        }
    }
    index = 0;
    var totalMed = 0;
    for( ; index < counter ; index++)
    {
        totalMed += incomeArray[index];
    }
    totalMed = (totalMed/counter);
    return totalMed;
}

function getSingleCovid() {
    var index = 0;
    var allFeatures = geoJson.features;    //array of all county features
    var length = allFeatures.length
    var covidArray = [];
    var counter = 0;    //total counties of current state
    for( ; index < length ; index++)
    {
        var thisProperty = allFeatures[index].properties;    //this current county's properties
        if(thisProperty.STATE_NAME == current_state)
        {
            covidArray[counter] = thisProperty.Covid_Cases[current_day];  //add this county's covid single day total to income array
            counter++;
        }
    }
    index = 0;
    var totalCases = 0;
    for( ; index < counter ; index++)
    {
        totalCases += covidArray[index];
    }
    return totalCases;
}