const Request = require('request');

function getWeather(req, res){
    Request.get('https://api.darksky.net/forecast/7feabe44ce85c5bfa8afea21eadcea07/?,?', [req.body.lat, req.body.long], (err, queryReturn) => {
        if(err){
            return console.log(err);
        } 
        console.log(queryReturn);
    })
}

module.exports.getWeather = getWeather;