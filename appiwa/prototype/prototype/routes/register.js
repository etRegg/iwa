var express = require('express');
var router = express.Router();


var filter = require('./service/filter');
var service = require('./service/service');
var bcrypt = require('bcryptjs');
var User = require('./../model/User');
var uuid = require('uuid/v4');







router.post('/register', function(req, res, next) {
	var userb = req.body;
console.log(userb);
//var hashedPassword = bcrypt.hashSync(userb.pass, 8);
 
 User.create({
	 id  : uuid(),
   name : req.body.name,
   email : req.body.email,
   password : req.body.pass
 },
function (err, user) {
  if (err) return res.status(500).send("There was a problem registering the user.")
  
  return res
	.status(200)
	.send({user:user,token: service.createToken(user)});
});


});

module.exports = router;


