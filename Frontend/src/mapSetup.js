/**
 * Setup the Leaflet Map.
 */

class Map {

    constructor() {}

    setup() {
        
        this.retrieveGeojson().then(res => {
            console.log('Displaying data');

            covid = L.geoJson(geoJson, {style: styleCovid});
            income = L.geoJson(geoJson, {style: styleIncome});

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

        var mymap = L.map('mapid', {
            maxBounds: L.latLngBounds(L.latLng(73.65, -180.00), L.latLng(10.50, -50.11)),
            layers: [covid],
            zoomControl: false
            }).setView([39.056882, -98.407468], 5);

            osm.addTo(mymap);
            /* End Create Leaflet Map */

            /* Sets Leaflet Map Layers */
            var overlayMaps = {
                "Covid": covid,
                "Income": income
            };

            /* Leaflet Layer Controls */
            L.control.layers(overlayMaps,null).addTo(mymap);
            /* Leaflet Zoom Control */
            L.control.zoom({position: 'topright'}).addTo(mymap);
            /* Leaflet Scale Bar */
            L.control.scale({position: 'topright'}).addTo(mymap);
            
            return mymap;
        });
        
        

        // const geoJson = Multiple_States_Simple;

        
        //DATA_LENGTH = geoJson.features[0].properties.covid.length;

        
    }

    async retrieveGeojson() {
        
        try{
            console.log('Fetching data');
            const response = await fetch(url);
            geoJson = await response.json();
            return geoJson;
        }
        catch(error) {
            console.log("ERROR: Failed to retrieve geojson from db");
            console.log(error);
        }

    }
}
