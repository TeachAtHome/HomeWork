//import modules
var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next){
    res.send("TeachAtHome");
});



module.exports = router; 


