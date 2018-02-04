var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongoserver:27017/";

module.exports = {
		  'create': function (myobj,f){
				
				MongoClient.connect(url, function(err, db) {
					  if (err) throw err;
					  var dbo = db.db("mydb");
					
					  dbo.collection("Users").insertOne(myobj, function(err, res) {
					    if (err) throw err;
					    console.log("1 document inserted");
					    dbo.collection("Users").findOne(myobj, function(err, result) {
						    if (err) throw err;
						    console.log(result);
						    user=result;
						    db.close();
						    f(err,user);
						    
						  });
					  });
					});
				
				
			}
,'findOne':function (myobj){
	var user=null;
	MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("mydb");
		  dbo.collection("Users").findOne(myobj, function(err, result) {
		    if (err) throw err;
		    console.log(result);
		    user=result;
		    db.close();
		  });
		});	
	return user;
	
	
}
		};




