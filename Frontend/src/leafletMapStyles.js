/**
*   Style functions for Leaflet Data Layers.
*/

/**
 * Specifies the color for a specific value of covid cases
 * 
 * @param   a   The number of cases  
 */
function getCovidColor(a) {
    // 6 classes natural breaks, red hue
    return a > 195740  ? '#a50f15' :    // Uppermost range is 310595 
           a > 104909  ? '#de2d26' :
           a > 45451   ? '#fb6a4a' :
           a > 19272   ? '#fc9272' :
           a > 6167    ? '#fcbba1' :
           a > 0       ? '#fee5d9' :
           a = 0       ? '#a3a3a3' :    // Gray
                         '#a3a3a3' ;
}

/**
 * Specifies the color for a specific value of median income
 * 
 * @param   a   The median income  
 */
function getIncomeColor(a) {
    return a > 116985  ? '#006837' :    // Uppermost range is 140382 
           a > 93588   ? '#31a354' :
           a > 70191   ? '#78c679' :
           a > 46794   ? '#addd8e' :
           a > 23397   ? '#d9f0a3' :
           a > 0       ? '#ffffcc' :
                         '#b5b5b5' ;
}

/**
 * Styles the covid layer for the map     
 */
function styleCovid(feature) {
    return {
        fillColor: getCovidColor(feature.properties.cases),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.6
    };
}

/**
 * Styles the income layer for the map     
 */
function styleIncome(feature) {
    return {
        fillColor: getIncomeColor(feature.properties.Med_Income),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.6
    };
}

/**
 * Style thes outline of the counties of a state when selected
 */
function styleState(feature) {
    return {
        fillColor: 'none',
        weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '0',
    };
}