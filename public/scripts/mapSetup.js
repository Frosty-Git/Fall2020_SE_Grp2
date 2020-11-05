/* Creates Leaflet Map */


class Map {

    getIncomeColor(a) {
        return a > 10 ? '#003300' :
               a > 8  ? '#006633' :
               a > 5  ? '#339933' :
               a > 3   ? '#00ff33' :
               a > 0   ? '#99ff99' :
                          '#FFEDA0';
    }

    styleIncome(feature) {
        return {
            fillColor: getIncomeColor(feature.properties.Med_Income),
            weight: 0.5,
            opacity: 1,
            color: 'black',
            dashArray: '0',
            fillOpacity: 0.7
        };
    }

    async setup() {
        //Our database connector object

        
        var osm = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            center: [39.056882, -98.407468], 
            maxZoom: 18,
            minZoom: 4, 
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZnJvc3R5MDA3IiwiYSI6ImNrZzU4ZTZlZzByeXEycm8zM29ldDk1aTIifQ.AYU9EhOwRLSUhmqhH92k5w'
            });
        
            var map = L.map('mapid', {
            maxBounds: L.latLngBounds(L.latLng(73.65, -180.00), L.latLng(10.50, -50.11)),
            zoomControl: false,
            }).setView([39.056882, -98.407468], 5);
        
            osm.addTo(map);
    }

    constructor() {
    }
}

const map = new Map();
map.setup();