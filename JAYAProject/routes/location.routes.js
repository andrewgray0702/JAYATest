const express = require('express');
const router = express.Router();
const location = require('../models/location.models')

router.get('/city', (req, res)=>{
    console.log("hit route")
    location.getLocation(req, res);
})

module.exports = router;