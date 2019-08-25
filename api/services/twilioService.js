const winston = require('winston')
const accountSid = process.env.AccountSid;
const authToken = process.env.AuthToken;
const client = require('twilio')(accountSid, authToken);
const twilioConfiguredFromNumber = process.env.TwilioConfiguredFromNumber;
const twilioMlUrl = process.env.TwilioMlUrl;

function triggerMessage(toNumber ,msg){
	try{
		client.messages
	      .create({body: msg, from: twilioConfiguredFromNumber, to: toNumber})
	      .then(message => console.log(message.sid)).done();
	  } catch (err) {
	  	winston.log('error',err);
	  }
}

function triggerCall(toNumber,msg) {
	client.calls.create(
	    { url: twilioMlUrl + encodeURI(msg), 
	      method: 'GET', 
	      to: toNumber, 
	      from: twilioConfiguredFromNumber
	    }).then(call => winston.log('info',call.sid)).done();
}

function sendNotification(notificationChannel,toNumber,msg){
	if (notificationChannel.toLowerCase() === 'phone') {
		triggerCall(toNumber,msg);
	} else if (notificationChannel.toLowerCase() === 'sms'){
		triggerMessage(toNumber,msg);
	} else {
		winston.log('info','Unknown Notification Channel');
	}
}

module.exports = {
    sendNotification
}