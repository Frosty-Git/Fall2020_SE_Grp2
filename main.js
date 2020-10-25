/* Map Script */
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
        fillColor: getColor(feature.properties.Covid_Cases[current_day]),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0.7
    };
}

var current_day = 0;
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

var cities = L.layerGroup([littleton, denver, aurora, golden]);
var counties = L.geoJson(NJ_Counties, {style: style} );


var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    center: [39.056882, -98.407468], 
    maxZoom: 18,
    minZoom: 5, 
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZnJvc3R5MDA3IiwiYSI6ImNrZzU4ZTZlZzByeXEycm8zM29ldDk1aTIifQ.AYU9EhOwRLSUhmqhH92k5w'
});

var mymap = L.map('mapid', {
    maxBounds: L.latLngBounds(L.latLng(31.460698, -177.272825), L.latLng(35.419656, -34.890008)),
    zoom: 10,
    layers: [cities, counties]
    }).setView([39.056882, -98.407468], 5);

osm.addTo(mymap);

var overlayMaps = {
    "Cities": cities,
    "Counties": counties
};

//L.geoJson(NJ_Counties, {style: style} ).addTo(mymap);
L.control.layers(null,overlayMaps).addTo(mymap);