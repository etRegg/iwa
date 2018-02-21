var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var filter = require('./service/filter');
var campagnings = []
var campagningsById = {};
var config = require('./service/config');



router.put('/:id',/* filter.ensureAuthenticated, */function(req, res, next) {
  var updatedcampagning = req.body;
  
     
var updatedContact = req.body;
  
  var ida = req.params["id"];
 





  var myquery = { id: ida };
  var newvalues = { $set:updatedContact  };
  config.DBO.collection("Contacts").updateOne(myquery, newvalues, function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
  });

});


router.get('/',filter.ensureAuthenticated, function(req, res, next) {
  	
	config.DBO.collection("Campagnings").find({}).toArray( function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
    
  });
	
});

router.get('/:id', function(req, res, next) {
  var ida = req.params["id"]; 
 
  config.DBO.collection("Campagnings").findOne({id:ida}, function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
   
  });
 });

router.delete('/:id', filter.ensureAuthenticated, function(req, res, next) {
  var id = req.params["id"];    
  config.DBO.collection("Campagnings").deleteOne({id:ida}, function(err, result) {
   try{
	if (err)throw err;
    res.json(result);
    
   }catch(err){
	   res.status(404).send("not found");
   }
  });
 
});


router.post('/', filter.ensureAuthenticated,  function(req, res, next) {
  var campagning = req.body;
  campagning.id = uuid();
  config.DBO.collection("Campagnings").insertOne(campagning, function(err, result) {
	  try{
			if (err)throw err;
		    res.json({id:ida});
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
  });
 });

module.exports = router;
