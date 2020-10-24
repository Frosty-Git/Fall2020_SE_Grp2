/* Map Script */

var mymap = L.map('mapid').setView([39.907, -75.031], 8);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    center: [39.056882, -98.407468], 
    maxZoom: 18,
    minZoom: 5, 
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZnJvc3R5MDA3IiwiYSI6ImNrZzU4ZTZlZzByeXEycm8zM29ldDk1aTIifQ.AYU9EhOwRLSUhmqhH92k5w'
}).addTo(mymap);

function getColor(a) {
    return a > 10000 ? '#b31010' :
           a > 5000  ? '#b34410' :
           a > 1000  ? '#e39f17' :
           a > 800  ? '#e3e017' :
           a > 500   ? '#074004' :
           a > 100   ? '#378532' :
           a > 0   ? '#bafab6' :
                      '#FFEDA0';
}

function getCovidColor(a) {
    return a > 100000 ? '#b31010' :
           a > 70000  ? '#b34410' :
           a > 60000  ? '#e39f17' :
           a > 50000  ? '#e3e017' :
           a > 40000   ? '#074004' :
           a > 20000   ? '#378532' :
           a > 0   ? '#bafab6' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getCovidColor(feature.properties.Med_Income),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.7
    };
}

L.geoJson(NJ_Counties, {style: style}, ).addTo(mymap);