//import modules
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET admin page. */
router.get('/login', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/login.html'));
});

module.exports = router;
