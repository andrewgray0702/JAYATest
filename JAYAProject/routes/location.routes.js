const express = require('express');
const router = express.Router();
const location = require('../models/location.models')

router.post('/city', (req, res)=>{
    //console.log("hit route")
    //console.log(req.body.search);
    //console.log(res);
    location.getLocation(req, res);
})

module.exports = router;