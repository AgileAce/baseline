<%
	Function GetConnectionString (inConnection)
		set filConnection = Server.CreateObject("Scripting.FileSystemObject").OpenTextFile(Server.MapPath("db_connections.dat"))
		 do while filConnection.AtEndOfLine <> true
		  	lneConnection = filConnection.readline
		  	strConnection = split (decrypt(lneConnection),"|")(0)
		  	if strConnection = inConnection then
		  		session("ConnectionString") = split (decrypt(lneConnection),"|")(1)
		  	end if
  		loop	
	End Function


	Function OpenConnection
	  Set adoCon = Server.CreateObject("ADODB.Connection")
	  adoCon.connectionstring = Session("ConnectionString")
		adoCon.CommandTimeout = 3000
	  adoCon.Open
	  OpenConnection = adoCon
	End Function


	Sub CloseConnection(adoCon)
		Set adoCon = Nothing
	End Sub


	Function OpenRS(strSQL,sResultType)
		On Error resume next
		Set adoCon = Server.CreateObject("ADODB.Connection")
		adoCon.connectionstring = Session("ConnectionString")
		adoCon.CommandTimeout = 0
		adoCon.Open
		'Set adoRS = Server.CreateObject("ADODB.Recordset")
		set adoRS = Server.CreateObject("ADODB.Command")
		set adoRS.ActiveConnection = adoCon
		adoRS.CommandText = "ProductInsert"
		adoRS.CommandType = 4
		adoRS.Parameters.Refresh
		adoRS.Parameters(1).Value = "Test Product"
		
		'adoRS.Open strSQL, adoCon
		adoRS.Execute
		if adoCon.Errors.Count > 0 then
			response.write adoRS.parameters(0).value & " - " & adoCon.Errors(0).Description
			'response.write adoRS.Fields(0).Value & " - " & adoCon.Errors(0).Description
			Set adoCon = Nothing
			OpenRS = null
		else
			if adoRS.eof then
				OpenRS = null
			else
				arrData = adoRS.getrows
				if sResultType = "H" then
					redim arrHeaders(ubound(arrData,1))
					for iCounter = 0 to ubound(arrData,1)
						arrHeaders(iCounter) = adoRS(iCounter).name
					next
					OpenRS = arrHeaders
				else
					OpenRS = arrData
				end if
			end if
			Set adoRS = Nothing
			Set adoCon = Nothing	
		end if	
	End Function


	Sub CloseRS(rs)
		Set rs = Nothing
	End Sub

%>