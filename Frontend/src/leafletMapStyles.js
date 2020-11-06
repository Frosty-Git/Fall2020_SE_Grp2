/**
 * Style functions for Leaflet Data Layers.
 */

function getCovidColor(a) {
    return a > 20000  ? '#e84141' :
           a > 10000  ? '#c75d00' :
           a > 2500   ? '#e68a39' :
           a > 250   ? '#fffc5c' :
           a > 0   ? '#33662b' :
                      '#FFEDA0';
}

function getIncomeColor(a) {
    return a > 80000 ? '#33662b' :
           a > 55000  ? '#6bd459' :
           a > 45000  ? '#fffc5c' :
           a > 38000   ? '#e68a39' :
           a > 0   ? '#e84141' :
                      '#FFEDA0';
}

function styleCovid(feature) {
    return {
        fillColor: getCovidColor(feature.properties.cases),
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