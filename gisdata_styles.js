function getCovidColor(a) {
    return a > 10000 ? '#b31010' :
           a > 5000  ? '#b34410' :
           a > 1000  ? '#e39f17' :
           a > 800  ? '#e3e017' :
           a > 500   ? '#074004' :
           a > 100   ? '#378532' :
           a > 0   ? '#bafab6' :
                      '#FFEDA0';
}

function getIncomeColor(a) {
    return a > 100000 ? '#003300' :
           a > 80000  ? '#006633' :
           a > 50000  ? '#339933' :
           a > 30000   ? '#00ff33' :
           a > 0   ? '#99ff99' :
                      '#FFEDA0';
}

function styleCovid(feature) {
    return {
        fillColor: getCovidColor(feature.properties.Covid_Cases[current_day]),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.7
    };
}

function styleIncome(feature) {
    return {
        fillColor: getIncomeColor(feature.properties.Med_Income),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.7
    };
}