import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const url = 'https://raw.githubusercontent.com/prantikseal/leaflet-js-map-india/main/Indian_States.json';


const map = L.map('map').setView([22.591349, 88.405094], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19 ,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




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

var marker = L.marker([22.571378, 88.387413],{
    icon: greenIcon
}).addTo(map);
var marker = L.marker([22.583501, 88.423153],{
    icon: redIcon
}).addTo(map);
var marker = L.marker([22.564403, 88.411617],{
    icon: orangeIcon
}).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I live here").openPopup();


var popup = L.popup();

function onMapClick(e) {
    popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString() + "\n" + "zoom level is " + map.getZoom()).openOn(map);
}

map.on('click', onMapClick);

L.control.scale({
    position: 'topright',
    metric: true,
    imperial: false,
}).addTo(map);



fetch(url)
    .then(res => res.json())
    .then(data => {
        let indianStates = data;
        console.log(indianStates);
        L.geoJSON(indianStates).addTo(map);
    });