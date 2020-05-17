// Example of Cloud action forwarding events to AWS via API gateway
function ( Evt )
{
	var deviceId = Evt.path.split("/")[3];

	var Payload = {
		"deviceId": deviceId,
		"light": Evt.elems.redSensor.light,
		"creationDate": Evt.generatedDate
	};
	var Body = JSON.stringify ( Payload );
	var Hdrs = {
		'Content-Type' : 'application/json'
	};

	// update the url with your own service, this one is a simple MOCK returning always OK
	var Res = Octave.Http.post ( 'https://m6d92mu3a2.execute-api.eu-west-1.amazonaws.com/bk_beta', Hdrs, Body );
	console.log ( Res );

	var EvtNew = {
		"elems": {
			'result': Res,
			'payload': Payload
		}
	};

	// Will be logged
	return {
		"/sierra_internal/webhooks/results": [
			EvtNew
		]
	};
} 
