<?php
	$inData = getRequestInfo();

	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$phone = $inData["Phone"];
	$email = $inData["Email"];
	$userID = $inData["UserID"];

	// localhost, username, password, database
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) 
			VALUES('" . $firstName . "', '" . $lastName ."', '" . $phone ."','" . $email ."', '". $userID ."')" ;
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
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
?>