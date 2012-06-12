<%
function QueryToJSON(strSQL)
	dim adoRS, arrJson

	on error resume next
	set adoCon = Server.CreateObject("ADODB.Connection")
	adoCon.connectionstring = "Provider=SQLOLEDB;Server=.;Database=SilverBullet;User ID=sa;Password=System101$;Trusted_Connection=False;"
	adoCon.commandtimeout = 0
	adoCon.open

	set adoRS = adoCon.execute(strSQL)
	'if adoCon.Errors.Count > 0 then	
	'	response.write adoCon.Errors(0).NativeError
	'end if
	set arrJson = jsArray()
	while not (adoRS.EOF or adoRS.BOF)
		set arrJson(null) = jsObject()
		for each adoCol in adoRS.fields
			arrJson(null)(adoCol.name) = adoCol.value
		next
		adoRS.movenext
	wend
	set QueryToJSON = arrJson
end function
%>