var jwt = require('jsonwebtoken');
var config = require('./config');

exports.createToken = function(user) {

  return jwt.sign({
	  data: user
	}, config.TOKEN_SECRET, { expiresIn: '24h' });

};