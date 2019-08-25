'use strict';
module.exports = function(app) {
  var apiController = require('../controller/callApiController');

  app.route('/twilio').post(apiController.twilioService);

  app.route('/nexmo').post(apiController.nexmoService);

  app.route('/test').post(apiController.logReqest);

};