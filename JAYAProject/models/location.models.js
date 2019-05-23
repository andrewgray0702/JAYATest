const Request = require('request');
const fetch = require('node-fetch');
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoiYW5kcmV3Z3JheSIsImEiOiJjanZ5ZWlwMDkwZjNpNGRtcXJrajQ3cG44In0.Yn7UkfJamhhLMtEolCxfOw');

function getLocation(req, res) {
    var search = req.body.search;
    //console.log(search);
    client.geocodeForward(search)
        .then(function (response) {
            var data = response.entity;
            var long = data.features[0].center[0];
            var lat = data.features[0].center[1];
            //console.log(lat, long);
            getWeather(lat, long);
            async function getWeather(lat, long){
                console.log(lat, long);
                let call = await fetch('https://api.darksky.net/forecast/7feabe44ce85c5bfa8afea21eadcea07/' + lat + ',' + long);
                let data = await call.json();
                //console.log(data);
                res.send(data);
            } 
        })
        .catch(function (err) {
            if(err){
                console.log(err);
            }
        });
}


// async function getLocation(req, res){
//     let response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + "Omaha" + ".json?access_token=pk.eyJ1IjoiYW5kcmV3Z3JheSIsImEiOiJjanZ5ZWlwMDkwZjNpNGRtcXJrajQ3cG44In0.Yn7UkfJamhhLMtEolCxfOw");
//     let data = await response.json(); 
//     let features = (data['features']);
//     return console.log(features);

// }

// getLocation()
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

module.exports.getLocation = getLocation;