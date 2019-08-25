const Nexmo = require('nexmo')
const winston = require('winston')

const nexmo = new Nexmo({
  apiKey: process.env.NexmoApiKey,
  apiSecret: process.env.NexmoApiSecret,
  applicationId: process.env.NexmoApplicationId,
  privateKey: "./private.key"
})

const nexmoConfiguredFromNumber = process.env.NexmoConfiguredFromNumber;

function triggerMessage(toNumber ,msg){
	nexmo.message.sendSms(nexmoConfiguredFromNumber, toNumber, msg, (err, responseData) => {
	    if (err) {
	        winston.log('error', err);
	    } else {
	        if(responseData.messages[0]['status'] === "0") {
	        	winston.log('info', 'Message sent successfully');
	        } else {
	            winston.log('info','Message failed with error: ' + ${responseData.messages[0]['error-text']});
	        }
	    }
	})

}

function triggerCall(toNumber,msg) {
	const ncco = [
		{
		  action: 'talk',
		  voiceName: 'Raveena',
		  text: msg,
		}];
  	nexmo.calls.create(
		{
			to: [{ type: 'phone', number: toNumber }],
			from: { type: 'phone', number: nexmoConfiguredFromNumber },
			ncco,
		},
		(err, result) => {
			winston.log('error',err || result);
		});
}

function sendNotification(notificationChannel,toNumber,msg){
	if (notificationChannel.toLowerCase() === "phone") {
		triggerCall(toNumber,msg);
	} else if (notificationChannel.toLowerCase() === "sms"){
		triggerMessage(toNumber,msg);
	} else {
		winston.log("Unknown Notification Channel");
	}
}

module.exports = {
    sendNotification
}