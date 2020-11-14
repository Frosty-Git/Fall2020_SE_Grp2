/**
 * Style functions for Leaflet Data Layers.
 */

// const nodemon = require("nodemon");

function getCovidColor(a) {
    //5 classes natural breaks
    // return a > 195740  ? '#d00404' :
    //        a > 104909  ? '#ff440e' :
    //        a > 35102   ? '#fd7610' :
    //        a > 8846    ? '#fd9a01' :
    //        a > 0       ? '#ffc22d' :
    //        a = 0       ? '#f7ff5d' :
    //                      '#707070';

    //8 classes natural breaks
    return  a > 163287  ?   '#ce0808'  :
            a > 104909  ?   '#d63f00'  :
            a > 68803   ?   '#dd5e00'  :
            a > 38288   ?   '#e27900'  :
            a > 18972   ?   '#e79204'  :
            a > 8549    ?   '#eaaa1f'  :
            a > 2736    ?   '#ecc237'  :
            a > 0       ?   '#ffff85'  :
            a = 0       ?   '#ffffb3'  :   
                            '#707070';
                            //#dea940
            
    //Original
    // return a > 20000  ? '#e84141' :
    //        a > 10000  ? '#c75d00' :
    //        a > 2500   ? '#e68a39' :
    //        a > 250   ? '#fffc5c' :
    //        a > 0   ? '#33662b' :
    //                     '#707070';
}

function getIncomeColor(a) {
    return a > 80000 ? '#33662b' :
           a > 55000  ? '#6bd459' :
           a > 45000  ? '#fffc5c' :
           a > 38000   ? '#e68a39' :
           a > 0   ? '#e84141' :
                         '#707070';
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

function styleState(feature) {
    return {
        fillColor: 'none',
        weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '0',
    };
}