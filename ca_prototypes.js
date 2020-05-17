function ( Evt )
{
	var deviceId = Evt.path.split("/")[3];
	var account = Evt.path.split("/")[1];
	var path2 = Evt.path.split("/")[2];

	var DevId2 = Evt.Tags.Name;
	var DevPath = Evt.path;

	console.log ( Res );

	var Cmd = "/sierra_internal/devices/" + deviceId.toLowerCase() + "/:command";

	if ( Evt.elems.redSensor.light > threshold ) {
		Res [ Cmd ] = [{
			elems: {
				lcd: {
					txt1: "Light threshold!"
				}
			}
		}];

		return Res;
	}


	var EvtNew = {
		"elems": {
			'result': Res,
			'payload': Payload
		}
	};

	// Return data to the stream in the cloud
	return {
		"/sierra_internal/webhooks/results": [
			EvtNew
		]
	};
}



var Evt = Octave.Event.get ( StreamId, EvtId );

var Evts = Octave.Event.find (
	StreamId,
	{
		"filter" : "x > 1",
		"limit" : "2",
		"start" : "0",
		"limit" : "20",
		"sort" : "creationDate",
		"order" : "desc"
	}
);

var Evts = Octave.Event.findOne (
	StreamId,
	{
		"filter" : "x > 1",
		"start" : "0",
		"limit" : "20",
		"sort" : "creationDate",
		"order" : "desc"
	}
);

var Evt = Octave.Event.findHash ( StreamId, Hash );

// TODO: fix mistypings
var Evts = Octave.Event.multifind([
	{
		streamId : StreamId,
		"params" : {
			"limit" : 1,
			"sort" : "creationDate",
		}
	},
	{
		streamId : "s234567234567234567234567",
		"params" : {
			"limit" : 1,
			"sort" : "creationDate",
			"order" : "desc"
		}
	},
    path : "/mycompany/mystream",
	"params" : {}
]);


var Evts = Octave.Event.aggregate (
	myStreamId,
	{
		"filter" : "EXISTS cpu_temp",
		"rules" : { "x" : "cpu_temp > 50" },
		"groupBy" : [ "$month" ],
		"output" : [
			"$avg:cpu_temp",
			"$min:cpu_temp",
			"$max:cpu_temp",
			"$avg:x",
			"$count"
		],
		"sorts" : [ "$avg:x:desc", "$avg:cpu_temp:asc" ]
	}
);

var Streams = Octave.Stream.find (
	{
		"filter" : "x > 1",
		"start" : "0",
		"limit" : "20",
		"sort" : "creationDate",
		"order" : "desc"
	}
);

var StreamId = Octave.Stream.get ( StreamId );


// Dev

DevName = Octave.Device.getName ( );

Dev = Octave.Device.get ( DevId );

var Devs = Octave.Device.find (
	{
		"filter" : "x > 1",
		"start" : "0",
		"limit" : "20",
		"sort" : "creationDate",
		"order" : "desc"
	}
);

// TODO: what is DevDiff?
Dev = Octave.Device.update ( DevId, DevDiff );


// HTTP

var Hdrs = {
	'header1' : '1',
	'header2' : '2'
};
var HttpRsp = Octave.Http.get ( HttpHostUrl, Hdrs );

var HttpHostUrl = 'http://httpbin.org/post';
var Body = JSON.stringify ( Payload );
var Hdrs = {
	'Content-Type' : 'application/json',
	'header2' : '2'
};
var HttpRsp = Octave.Http.post ( HttpHostUrl, Hdrs, Body );

var HttpHostUrl = 'http://httpbin.org/put';
var Body = JSON.stringify ( Payload );
var Hdrs = {
	'Content-Type' : 'application/json',
	'header2' : '2'
};
var HttpRsp = Octave.Http.put ( HttpHostUrl, Hdrs, Body );

var HttpHostUrl = 'http://httpbin.org/delete'
var Hdrs = {
	'header1' : '1',
	'header2' : '2'
};
var HttpRsp = Octave.Http.delete ( HttpHostUrl, Hdrs );
