var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

var campagnings = []
var campagningsById = {};

router.put('/:id', function(req, res, next) {
  var updatedcampagning = req.body;
  
  var id = req.params["id"];    
  var campagning = campagningsById[id];
  if (campagning) {
      campagning.name = updatedcampagning.name;
      campagning.mail = updatedcampagning.mail;
      campagning.text = updatedcampagning.text;
      res.json(campagning);
  } else {
      res.status(404).send("not found");
  }
});


router.get('/', function(req, res, next) {
  res.json(campagnings);
});

router.get('/:id', function(req, res, next) {
  var id = req.params["id"];    
  var campagning = campagningsById[id];
  if (campagning) {
      res.json(campagning);
  } else {
      res.status(404).send("not found");
  }
});

router.delete('/:id', function(req, res, next) {
  var id = req.params["id"];    
  var campagning = campagningsById[id];
  
  if (campagning) {
      delete campagningsById[id];
      campagnings.splice(campagnings.indexOf(campagning), 1)
      res.json(campagning);
  } else {
      res.status(404).send("not found");
  }
  
});


router.post('/', function(req, res, next) {
  var campagning = req.body;
  campagning.id = uuid();
  campagnings.push(campagning);
  campagningsById[campagning.id] = campagning;
  res.send(campagning);
});

module.exports = router;
