const Request = require('request');
const fetch = require('node-fetch');
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoiYW5kcmV3Z3JheSIsImEiOiJjanZ5ZWlwMDkwZjNpNGRtcXJrajQ3cG44In0.Yn7UkfJamhhLMtEolCxfOw');

async function getLocation(req, res) {
    try {
    let response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + "Omaha" + ".json?access_token=pk.eyJ1IjoiYW5kcmV3Z3JheSIsImEiOiJjanZ5ZWlwMDkwZjNpNGRtcXJrajQ3cG44In0.Yn7UkfJamhhLMtEolCxfOw&autocomplete=true&fuzzyMatch=true");
    let data = await response.json();
    let features = (data['features']);
    var long = features[0].center[0];
    var lat = features[0].center[1];
    var place = data.features[0].text;
    //console.log(lat, long);
    getWeather(lat, long, place);
    async function getWeather(lat, long, place) {
        try{
        //console.log(lat, long);
        let call = await fetch('https://api.darksky.net/forecast/7feabe44ce85c5bfa8afea21eadcea07/' + lat + ',' + long);
        let data = await call.json();
        //console.log(data);
        data['location'] = place;
        console.log(data['location']);
        return res.send(data);
        } catch (err) {
            return res.status(500).send({error: err})
        }
    }
    } catch (err) {
        return res.status(500).send({error: err})
    }
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