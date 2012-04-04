<%

	set xmlhttp = server.CreateObject("MSXML2.XMLHTTP")
	xmlhttp.Open "GET","http://user-agent-string.info/rpc/rpctxt.php?key=free&ua=" & request.querystring("userAgent"),false
	xmlhttp.send
	sReponse = xmlhttp.responseText
	response.write (sReponse)

%>