<!--#include file="../lib/DBFunctions.inc"-->
<%
    ' Connection -- and stuff -- and another change
	session("ConnectionString") = "Provider=SQLOLEDB;Server=.;Database=SilverBullet;User ID=sa;Password=System101$;Trusted_Connection=False;"
	arrTest = OpenRS("exec Product.ProductInsert 'Test Product'","D")
%>
