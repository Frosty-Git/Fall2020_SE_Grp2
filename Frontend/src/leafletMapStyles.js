/**
 * Style functions for Leaflet Data Layers.
 */

// const nodemon = require("nodemon");

function getCovidColor(a) {
    // 6 classes natural breaks, yellow hue
    // return a > 195740  ? '#bd0026' :    //uppermost range is 310595 
    //        a > 104909  ? '#f03b20' :
    //        a > 45451   ? '#fd8d3c' :
    //        a > 19272   ? '#feb24c' :
    //        a > 6167    ? '#fed976' :
    //        a > 0       ? '#ffffb2' :
    //        a = 0       ? '#a3a399' :
    //                      '#a3a399' ;
    
    //6 classes natural breaks, red hue
    return a > 195740  ? '#a50f15' :    //uppermost range is 310595 
           a > 104909  ? '#de2d26' :
           a > 45451   ? '#fb6a4a' :
           a > 19272   ? '#fc9272' :
           a > 6167    ? '#fcbba1' :
           a > 0       ? '#fee5d9' :
           a = 0       ? '#a3a3a3' :
                         '#a3a3a3' ;

    //0 color gray for yellow hue: #a3a399, 0 green color: #8cbf84
    //0 color gray for red hue: #a3a3a3, 0 dark green color #799170
}

function getIncomeColor(a) {
    return a > 116985  ? '#006837' :    //uppermost range is 140382 
           a > 93588   ? '#31a354' :
           a > 70191   ? '#78c679' :
           a > 46794   ? '#addd8e' :
           a > 23397   ? '#d9f0a3' :
           a > 0       ? '#ffffcc' :
                         '#b5b5b5' ;
}

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

function styleState(feature) {
    return {
        fillColor: 'none',
        weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '0',
    };
}