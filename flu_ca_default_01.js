function ( Evt )
{
/*
Evt={\"id\":\"e5ebd3c56ffefd8d6386f61d7\",\"streamId\":\"s5eb12a71fd37392bffa3548a\",\"creationDate\":1589460054818,\"lastEditDate\":1589460054818,\"generatedDate\":1589460052405,\"hash\":null,\"location\":null,\"path\":\"/swiflu/devices/flumghy01/:default\",\"metadata\":{},\"tags\":{},\"elems\":{\"message\":\"flu_ea_temp_01 done 12:40:52.417 34.404297\"}}
*/
	console.log ( Evt );

	var Ret = { };

	var DateTime = new Date ( );
	var sDateTime = DateTime.toString ( );

	var Msg = "flu_ca_default_01 " + sDateTime;
	Msg += "\nEvt=" + JSON.stringify ( Evt );

	var DevId = Evt.path.split ( "/" ) [ 3 ];
	if ( DevId ) {
		console.log ( DevId );
		//Msg += "\nDevId=" + DevId;
	}

	var CompanyId = Evt.path.split ( "/" ) [ 1 ];
	console.log ( CompanyId );
	//Msg += "\nCompanyId=" + CompanyId;

	console.log ( Msg );

	//var HttpHostUrl = 'http://httpbin.org/post';
	var HttpHostUrl = 'https://ptsv2.com/t/mjd2c-1589441994/post';
	var HttpHdrs = {
		'Content-Type' : 'application/json',
	};
	var HttpBody = JSON.stringify ( Msg );
	var HttpRsp = Octave.Http.post ( HttpHostUrl, HttpHdrs, HttpBody );
	console.log ( HttpRsp );
	// TODO: check https://ptsv2.com/t/mjd2c-1589441994

	/*
	if ( DevId ) {
		var CmdPath = "/" + CompanyId.toLowerCase ( ) + "/devices/" + DevId.toLowerCase ( ) + "/:command";
		Ret [ CmdPath ] = [{
			"elems": {
				"message": Msg
			}
		}];
	}
	*/

	/*
	var StrmPath = "/" + CompanyId.toLowerCase ( ) + "/flu_cs_debug_01";
	Ret [ StrmPath ] = [{
		"elems": {
			"message": Msg
		}
	}];
	*/

	console.log ( Ret );
	return Ret;
}
