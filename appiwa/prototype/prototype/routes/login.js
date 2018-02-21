var express = require('express');
var router = express.Router();


var filter = require('./service/filter');
var service = require('./service/service');
var bcrypt = require('bcryptjs');
var User = require('./../model/User');
var uuid = require('uuid/v4');








router.post('/login', function(req, res, next) {
	 var userb = req.body;
	 console.log(userb);
	  User.findOne({ email: userb.email }, function (err, user) {
	    if (err) return res.status(500).send('Error on the server.');
	    if (!user) return res.status(404).send('No user found.');
	    var passwordIsValid = bcrypt.compareSync(userb.pass, user.password);
	    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
	    return res
    	.status(200)
        .send({token: service.createToken(user)});
	  });
       
   
});

module.exports = router;
