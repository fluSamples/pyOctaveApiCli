function ( Evt )
{
/*
Evt={\"id\":\"e5ebd436dffefd8d638705ecc\",\"streamId\":\"s5eba9a0605711ec637eb4142\",\"creationDate\":1589461869764,\"lastEditDate\":1589461869764,\"generatedDate\":1589461869298,\"hash\":null,\"location\":null,\"path\":\"/swiflu/devices/flumghy01/flu_obs_cs_light_01\",\"metadata\":{},\"tags\":{},\"elems\":{\"light\":1.453056}}
*/

	console.log ( Evt );

	var Ret = { };

	var DateTime = new Date ( );
	var sDateTime = DateTime.toString ( );

	var Msg = "flu_ca_light_01 " + sDateTime;
	Msg += "\nEvt=" + JSON.stringify ( Evt );

	var LightVal = Evt.elems.light;

	var DevId = Evt.path.split ( "/" ) [ 3 ];
	if ( DevId ) {
		console.log ( DevId );
		//Msg += "\nDevId=" + DevId;
	}

	var CompanyId = Evt.path.split ( "/" ) [ 1 ];
	console.log ( CompanyId );
	//Msg += "\nCompanyId=" + CompanyId;

	console.log ( Msg );

	if ( (LightVal * 10) >= 15 ) {
		//var HttpHostUrl = 'http://httpbin.org/post';
		var HttpHostUrl = 'https://ptsv2.com/t/mjd2c-1589441994/post';
		var HttpHdrs = {
			'Content-Type' : 'application/json',
		};
		var HttpBody = JSON.stringify ( Msg );
		var HttpRsp = Octave.Http.post ( HttpHostUrl, HttpHdrs, HttpBody );
		console.log ( HttpRsp );
		// TODO: check https://ptsv2.com/t/mjd2c-1589441994
	}

	var OpenWeatherMapApi = "api.openweathermap.org/data/2.5/";
	var OpenWeatherMapApiKey = "62e14b003e883bd044ccbe7c792e63a1";
	// OpenWeatherMapApi + forecast?id=524901&APPID=OpenWeatherMapApiKey
	// OpenWeatherMapApi + weather?lat={lat}&lon={lon}&APPID=OpenWeatherMapApiKey
	// OpenWeatherMapApi + weather?q=London,uk&APPID=OpenWeatherMapApiKey

	if ( (LightVal * 10) >= 17 ) {
		if ( DevId ) {
			var CmdPath = "/" + CompanyId.toLowerCase ( ) + "/devices/" + DevId.toLowerCase ( ) + "/:command";
			Ret [ CmdPath ] = [{
				"elems": {
					"message": Msg
				}
			}];
		}
	}

	if ( (LightVal * 10) >= 20 ) {
		var StrmPath = "/" + CompanyId.toLowerCase ( ) + "/flu_cs_02";
		Ret [ StrmPath ] = [{
			"elems": {
				"message": Msg
			}
		}];
	}

	console.log ( Ret );
	return Ret;
}
