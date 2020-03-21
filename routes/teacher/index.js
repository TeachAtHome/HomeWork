//import modules
var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/teacher/:id', function(req, res, next){
    res.send("teacher");
});

module.exports = router; 


