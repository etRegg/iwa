var MongoClient = require('mongodb').MongoClient;
var ob={
	  TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto"
	  ,
	  DBO:    null
	};
var  url = "mongodb://mongoserver:27017/";
try{
    MongoClient.connect(url, function(err, db) {
  if (err) throw err
 
	 ob.DBO= db.db("mydb");




    });
}catch(err){}


module.exports = ob;