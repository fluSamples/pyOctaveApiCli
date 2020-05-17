function ( Evt )
{
	//options is not used here, but in a real customer implementation, there are authentication headers etc...
	var deviceId = Evt.path.split("/")[3];
	var account = Evt.path.split("/")[1];
	var path2 = Evt.path.split("/")[2];

	var Opts = {
		"X_API_KEY" : "AN API KEY",
		"OTHER_HEADER" : "OTHER HEADER VALUE"
	};

	var Body = JSON.stringify ( {
		"event_received" : Evt.elems.value,
		"location" : Evt.location,
		"deviceId" : deviceId,
		"company" : account
	} );

	// Post to 3rd party cloud
	var Res = Octave.Http.post ( "https://webhook.site/YOUR_ID", Opts, Body );

	//console log to view server reply
	console.log ( Res );

	// Return data to a stream in the cloud troubleshooting session
	return {
		'/sierra_internal/training/YOUR_STREAM_NAME/': [{
			"elems": {
				"result": Res
			}
		}]
	}
}