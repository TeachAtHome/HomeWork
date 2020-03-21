//import modules
var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/student/:id', function(req, res, next){
    res.send("student");
});


module.exports = router; 


