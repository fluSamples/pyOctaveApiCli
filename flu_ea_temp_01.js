function ( Evt )
{
    // Evt.value, Evt.timestamp
	
	var Res = { };
	var Timeout = 0;
	var MeasDur_s = 10;

	var DateTime = new Date ( );
 	var sDateTime = DateTime.toTimeString ( );
	var Msg = "flu_ea_temp_01 " + sDateTime + " " + Evt.value;
	console.log ( Msg );

	/* OK
	var TemperVal = Datahub.read ( "/imu/temp/value", Timeout ).value;
	console.log ( "TemperVal=" + TemperVal );*/

	/* FIXME
	var Env = Datahub.read ( "/environment/value", Timeout );
	if ( Env ) {
		console.log ( "Env=" );
		console.log ( Env );
		//Res [ "temp" ] = Env;
	}*/

	/* OK
	var TemperMeanVal = Datahub.query ( "flu_obs_ds_temp_01", 'MEAN', MeasDur_s );
	console.log ( "TemperMeanVal=" + TemperMeanVal );*/

	/* OK
	var flu_vr_res_01_val = Datahub.read ( "/virtual/flu_vr_res_01/value", Timeout ).value;
	console.log ( "flu_vr_res_01_val=" + JSON.stringify ( flu_vr_res_01_val ) );
	*/

    /* Cannot test
	var Pvt = Datahub.read ( "/location/coordinates/value",0 );
    if ( Pvt ) {
        Res [ "lat" ] = Pvt.lat;
		Res [ "lon" ] = Pvt.lon;
    }*/

	var DateTime = new Date ( );
 	var sDateTime = DateTime.toTimeString ( );
	var Msg = "flu_ea_temp_01 done " + sDateTime + " " + Evt.value;
    Res [ "message" ] = Msg;

	console.log ( "Res=" + JSON.stringify ( Res ) );
	return {
		"vr://flu_vr_res_01": [ Res ]
		,"cl://" : [ Res ]
		,"st://" : [ Res ]
		//,"dh://path/to/dh/res"
	}
}
