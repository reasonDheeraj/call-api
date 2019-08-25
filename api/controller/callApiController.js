'use strict';
var twilioService = require('../services/twilioService');
var nexmoService = require('../services/nexmoService');
const winston = require('winston')

exports.logReqest = function(req, res) {
  console.log('info',req.body.number);
  console.log('info',req.body.message);
  console.log('info',req.body.channel);
  res.json({message : "This Works"});
};


exports.twilioService = function(req, res) {
  if ((typeof(req.body.number) != "undefined") && (typeof(req.body.message) != "undefined") && (typeof(req.body.channel) != "undefined")) {
    winston.log('info',req.body.number);
    winston.log('info',req.body.message);
    winston.log('info',req.body.channel);
    try{
    twilioService.sendNotification(req.body.channel,req.body.number,req.body.message);
    res.json({Info : "Initiated Successfully"});
    } catch (err) {
        res.json({Info : "Initialization Falied"});
    }
  } else {
      res.status(400).send({Error : "Bad request parameters"});
  }
};

exports.nexmoService = function(req, res) {
  if ((typeof(req.body.number) != "undefined") && (typeof(req.body.message) != "undefined") && (typeof(req.body.channel) != "undefined")) {
    winston.log('info',req.body.number);
    winston.log('info',req.body.message);
    winston.log('info',req.body.channel);
    nexmoService.sendNotification(req.body.channel,req.body.number,req.body.message)
    res.json({Info : "Initiated Successfully"});
    } else {
      res.status(400).send({Error : "Bad request parameters"})
    }
};
