var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
var config = require('./config');
var User = require('./../model/User');

router.post('/register', function(req, res) {
	  var userb = req.body;
	  
	  var hashedPassword = bcrypt.hashSync(userb.pass, 8);
	   
	   User.create({
		 id  : uuid(),
	     name : userb.name,
	     email : userb.email,
	     password : hashedPassword
	   },
	  function (err, user) {
	    if (err) return res.status(500).send("There was a problem registering the user.")
	    // create a token
	    console.log('antes');
	    var token = jwt.sign({ id: user.id }, config.secret, {
	      expiresIn: 86400 // expires in 24 hours
	    });
	    console.log('despues');
	    res.status(200).send({ auth: true, token: token });
	  });
	});

router.get('/logout', function(req, res) {
	  res.status(200).send({ auth: false, token: null });
	});
router.post('/login', function(req, res) {
	  var userb = req.body;
	  User.findOne({ email: userb.email }, function (err, user) {
	    if (err) return res.status(500).send('Error on the server.');
	    if (!user) return res.status(404).send('No user found.');
	    var passwordIsValid = bcrypt.compareSync(userb.pass, user.password);
	    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
	    var token = jwt.sign({ id: user.id }, config.secret, {
	      expiresIn: 86400 // expires in 24 hours
	    });
	    res.status(200).send({ auth: true, token: token });
	  });
	});

module.exports = router;
