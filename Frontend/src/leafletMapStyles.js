/**
 * Style functions for Leaflet Data Layers.
 */

function getCovidColor(a) {
    return a > 20 ? '#b31010' :
           a > 15  ? '#b34410' :
           a > 10  ? '#e39f17' :
           a > 7  ? '#e3e017' :
           a > 4   ? '#074004' :
           a > 1   ? '#378532' :
           a > 0   ? '#bafab6' :
                      '#FFEDA0';
}

function getIncomeColor(a) {
    return a > 10 ? '#003300' :
           a > 8  ? '#006633' :
           a > 5  ? '#339933' :
           a > 3   ? '#00ff33' :
           a > 0   ? '#99ff99' :
                      '#FFEDA0';
}

function styleCovid(feature) {
    return {
        fillColor: getCovidColor(feature.properties.Covid_Cases),
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