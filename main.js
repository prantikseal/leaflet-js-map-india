import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import indianStates from 'https://raw.githubusercontent.com/prantikseal/leaflet-js-map-india/main/Indian_States.json';

// key for maptiler api

// const myMap = L.map('map').setView([0, 0], 1);
// var map = L.map('map').setView([51.505, -0.09], 13);

// india lat long
const map = L.map('map').setView([22.591349, 88.405094], 13);

// if want maptiler api
// L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
//   tileSize: 512,
//   zoomOffset: -1,
//   minZoom: 1,
//   crossOrigin: true
// }).addTo(map);

// if want openstreetmap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19 ,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

console.log(L);

// for default marker icons
// var leafletIcon = L.icon({ 
//     iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
//     shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

// for custom marker icons
var LeafletIcon = L.Icon.extend({
    options: {
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafletIcon({iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png'}),
    redIcon = new LeafletIcon({iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png'}),
    orangeIcon = new LeafletIcon({iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png'});



// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker kolkata
var marker = L.marker([22.571378, 88.387413],{
    icon: greenIcon
}).addTo(map);
var marker = L.marker([22.583501, 88.423153],{
    icon: redIcon
}).addTo(map);
var marker = L.marker([22.564403, 88.411617],{
    icon: orangeIcon
}).addTo(map);
// var marker = L.marker([22.583501, 88.423151],{
//     icon: leafletIcon
// }).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I live here").openPopup();

// marker.on('click', function(e) {
//     marker.bindPopup("<b>Hello world!</b><br>Welcome to Kolkata.").openPopup();
// });

var popup = L.popup();

function onMapClick(e) {
    popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString() + "\n" + "zoom level is " + map.getZoom()).openOn(map);
}

map.on('click', onMapClick);


// for geojson
var myGeoJson = indianStates;
L.geoJSON(myGeoJson).addTo(map);

L.control.scale({
    position: 'topright',
    metric: true,
    imperial: false,
}).addTo(map);

