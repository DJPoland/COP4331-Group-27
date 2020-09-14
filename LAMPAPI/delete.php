<?php
	$inData = getRequestInfo();
	$id = $inData["UserID"];
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];

	// localhost, username, password, database
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "DELETE from Contacts where FirstName ='". $firstName ."' and LastName ='" . 
			$lastName . "' and UserID ='". $id. "'";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		else
		{
			returnWithInfo($firstName, $lastName, $id );
		}
		$conn->close();
	}
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>