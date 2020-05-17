function ( Evt )
{
	var Timeout = 0;
	var WinSize = 0;
	var DateTime = new Date ( );

	//var DateTimeUtc = "";
	//DateTimeUtc =  "" + DateTime.getUTCFullYear ( ) + DateTime.getUTCMonth ( ) + DateTime.getUTCDay ( ) +  "-" + DateTime.getUTCHours( ) + DateTime.getUTCMinutes ( ) + DateTime.getUTCSeconds ( );

 	var sDateTime = DateTime.toString();

	console.log ( Evt );

	var TemperVal = Datahub.read ( "/imu/temp/value", Timeout );
	console.log ( TemperVal );

	/*
	var TemperMeanVal = Datahub.query ( "/imu/temp/value", 'MEAN', WinSize );
	console.log ( TemperMeanVal );
	*/

    var Res = {
		"message": "Done on " + sDateTime
    };

	console.log ( Res );

	return {
		"vr://flu_vr_Res_01": [ Res ]
		,"cl://" : [ Res ]
		,"st://" : [ Res ]
	}
}


function ( Evt )
{
	// Evt = Resource that triggered the EA + EA Observation

	var EvtVal = Evt.value;

	var Timeout = 0
	var ResValLatest = Datahub.read ( "/location/coordinates/value", Timeout );
    var TemperVal = Datahub.read ( "/imu/temp/value", Timeout ).value;
    var PressureVal = Datahub.read ( "/imu/pressure/value", Timeout ).value;
    var LocationCoord = Datahub.read ( "/location/coordinates/value", Timeout );
    var LightVal = Datahub.read ( "/redSensor/light/value", Timeout ).value;
    var CellularSigBars = Datahub.read ( "/util/cellular/signal/value", Timeout ).value.bars;
    var CellularRat = Datahub.read ( "/util/cellular/signal/value", Timeout ).value.rat;

	var WinSize = 0
	var TempValMax = Datahub.query ( '/imu/temp/value', 'MAX', WinSize );

	var Result = {
		"Var1" : Var1,
		"Var2" : Var2
	}

	return {
		"dh://lcd/txt1": [ "Str01" ],
		"cl://crRes01": [ Result ],
		"vr://vrRes01": [ { "newVRevent" : Result } ],
		"st://sfRes01": [ Result ]
	}
}
