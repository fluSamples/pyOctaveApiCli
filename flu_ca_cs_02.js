function ( Evt )
{
	console.log ( Evt );

	var Ret = { };

	var DateTime = new Date ( );
	var sDateTime = DateTime.toString ( );

	var Msg = "flu_ca_cs_02 " + sDateTime;
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

	if ( DevId ) {
		var CmdPath = "/" + CompanyId.toLowerCase ( ) + "/devices/" + DevId.toLowerCase ( ) + "/:command";
		Ret [ CmdPath ] = [{
			"elems": {
				"message": Msg
			}
		}];
	}

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