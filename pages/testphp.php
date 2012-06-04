<?php

	/* Testing Smart Commits again */
	/* and again ... */
	class customException extends Exception{
		public function errorMessage(){
			$errorMsg = "<b>".$this->getMessage()."</b><br/>"."Error on line ".$this->getLine()." in ".$this->getFile();
			return $errorMsg;
		}
	}
	
	/* Setting SQL Server driver parameters */
	sqlsrv_configure("LogSubsystems", 1);
	sqlsrv_configure("LogSeverity", 1);
	sqlsrv_configure("WarningsReturnAsErrors", 0);

	try{
		phpinfo();

		/* Load Config XML file */
		if (!file_exists("config.xml")){
			throw new customException("Config file missing!");
		}
		else{
			$xml = simplexml_load_file("config.xml");
		}

		/* Connect to SQL Server database */
		$connectionOptions = array("Database"=>(string)$xml->connection->databasename,"UID"=>(string)$xml->connection->databaseuser,"PWD"=>(string)$xml->connection->databasepassword);
		$conn = sqlsrv_connect((string)$xml->connection->databaseserver,$connectionOptions);
		if( $conn === false ){
			$dberrors = sqlsrv_errors();
			foreach($dberrors as $dberror){
				throw new customException($dberror["message"]);
			}
		}

		/* Execute SQL query, and return te result as a json object */
		$query = sqlsrv_query($conn,"exec Product.ProductSelect");
		if( $query === false ){
			$dberrors = sqlsrv_errors();
			foreach($dberrors as $dberror){
				throw new customException($dberror["message"]);
			}
		}
		$result = array();
		while($row = sqlsrv_fetch_object($query)){
			array_push($result, $row);
		}
		echo json_encode($result);

		/* Close the SQL Server database connection*/
		sqlsrv_close($conn);
	}
	
	catch(customException $e){
		echo $e->errorMessage();
	}

?>