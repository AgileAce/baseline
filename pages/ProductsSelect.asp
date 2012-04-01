<!--#include file="/Lib/DataLibrary/json_for_asp.asp"-->
<!--#include file="/Lib/DataLibrary/json_for_asp_util.asp"-->
<%
	QueryToJSON("EXEC dbo.ProductsInsert 'Test Product 7'").Flush
	
%>