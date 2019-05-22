const Request = require('request');

async function getLocation(req, res){
    try {
        latResponse = await Request.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" 
        + req.body.search + 
        "json?access_token=pk.eyJ1IjoiYW5kcmV3Z3JheSIsImEiOiJjanZ5ZWlwMDkwZjNpNGRtcXJrajQ3cG44In0.Yn7UkfJamhhLMtEolCxfOw")
        if(latResponse){
            console.log(res)
        }
    } catch (err) {
        return res.status(500)
    }

}

module.exports.getLocation = getLocation;