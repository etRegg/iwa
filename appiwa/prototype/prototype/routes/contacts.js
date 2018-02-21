var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var filter = require('./service/filter');
var config = require('./service/config');

router.put('/:id',filter.ensureAuthenticated, function(req, res, next) {
  var updatedContact = req.body;
  
  var ida = req.params["id"];
  console.log(updateContact);
console.log(ida);




  var myquery = { id: ida };
  var newvalues = { $set:updatedContact  };
  config.DBO.collection("Contacts").updateOne(myquery, newvalues, function(err, result) {
	  try{
			if (err)throw err;
		    res.json({id:ida});
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
  });


});






router.get('/', filter.ensureAuthenticated, function(req, res, next) {
    console.log(req.user);
	config.DBO.collection("Contacts").find({}).toArray( function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
   
  });


	
	
  
});

router.get('/:id', filter.ensureAuthenticated,  function(req, res, next) {
  var ida = req.params["id"];


  
  config.DBO.collection("Contacts").findOne({id:ida}, function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
   
  });

});

router.delete('/:id', filter.ensureAuthenticated, function(req, res, next) {
  var ida = req.params["id"];    
 
  config.DBO.collection("Contacts").deleteOne({id:ida}, function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
  });

});


router.post('/', filter.ensureAuthenticated, function(req, res, next) {
  var contact = req.body;
  contact.id = uuid();

  
  config.DBO.collection("Contacts").insertOne(contact, function(err, result) {
	  try{
			if (err)throw err;
		    res.json(result);
		    
		   }catch(err){
			   res.status(404).send("not found");
		   }
    
  });

});

module.exports = router;
