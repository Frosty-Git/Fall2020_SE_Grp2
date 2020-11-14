// const leafletMap = new Map();
// var mymap;
// async function setupMap() {
//     mymap = await leafletMap.setup();
// }
// setupMap();




var covid;
var income;
let layerControls;
let overlayMaps;


console.log('Fetching data');
// const response = await fetch(url);
// geoJson = await response.json();
// console.log(geoJson);

const dateString = dateStringFromMilli(Date.parse(date));
        const data = { dateString }
        const options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(data)
        }
        fetch(dateURL, options).then(response => {
            
            response.json().then(res => {
            // const geoJson = Multiple_States_Simple;

                geoJson = res;
                covid = L.geoJson(res, { style: styleCovid });
                income = L.geoJson(res, { style: styleIncome });
                //DATA_LENGTH = geoJson.features[0].properties.covid.length;

                /* Creates Leaflet Map */
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

                mymap = L.map('mapid', {
                    maxBounds: L.latLngBounds(L.latLng(73.65, -180.00), L.latLng(10.50, -50.11)),
                    layers: [covid],
                    zoomControl: false
                }).setView([39.056882, -98.407468], 5);

                osm.addTo(mymap);
                /* End Create Leaflet Map */

                /* Sets Leaflet Map Layers */
                overlayMaps = {
                    "Income": income,
                    "Covid": covid
                };

                /* Leaflet Layer Controls */
                layerControls = L.control.layers(overlayMaps, null);
                //L.control.layers(overlayMaps, null).addTo(mymap);
                layerControls.addTo(mymap);
                /* Leaflet Zoom Control */
                L.control.zoom({ position: 'topright' }).addTo(mymap);
                /* Leaflet Scale Bar */
                L.control.scale({ position: 'topright' }).addTo(mymap);
            });
        });
        

console.log('Displaying data');
        






function dateStringFromMilli(dateMilli) {
    var dateNew = new Date(dateMilli);
    var curr_month = dateNew.getMonth() + 1; //Months are zero based
    var curr_date = dateNew.getDate();
    var curr_year = dateNew.getFullYear();
    var dateString = curr_year + "-" + curr_month + "-" + curr_date;
    //console.log(dateString);
    return dateString;
}

