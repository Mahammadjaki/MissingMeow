document.addEventListener('DOMContentLoaded', function() {
  console.log("Script loaded");
});
const socket = io();

let MyId = null; // variable to store the id of the user
let firstLocation = true; // variable to check if the user is sending the first location
const map =  L.map("map").setView([0,0],10); // the array is lat and langtitude and 10 is view hiegth of the map (zoom level).

socket.on("connect",()=>{
   MyId = socket.id; // get the id of the user
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"OpenStreetMap"
}).addTo(map); // add the map to the div with id map

const markers = {};

map.on('click', function(e) {
    const {lat, lng} = e.latlng;
    console.log("User selected location:", lat, lng);
    socket.emit("send-location", {latitude: lat, longitude: lng});
});

socket.on("receive-location",(data)=>{
    console.log(data);
    const {id,latitude,longitude} = data;
    // map.setView([latitude,longitude], 10); // set the view of the map to the location of the user
     if (id === MyId && firstLocation) {
        map.setView([latitude,longitude], 15);
        firstLocation = false;
    }
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
});