<?php
	$inData = getRequestInfo();

	//                   localhost,      db username,    db password,           db name
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
    $sql = "INSERT INTO Users (FirstName, LastName, Login, Password)
    VALUES ('" . $inData["FirstName"] . "', '" . $inData["LastName"] . "', '" . $inData["Login"] . "', '" . $inData["Password"] . "')";

    if ($conn->query($sql) === TRUE) {
      $retValue = '{"firstName":"' . $inData["FirstName"] . '","lastName":"' . $inData["LastName"] . '","Login":"' . $inData["Login"] . '","Password":"' . $inData["Password"] . '","error":""}';
  		sendResultInfoAsJson( $retValue );
    } else {
      returnWithError( "SIGN UP FAILED! ");
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

	function returnWithError ( $err )
	{
		$retValue = '{"firstName":"","lastName":"","Login":"","Password":"","error":"' . $err .'"}';
		sendResultInfoAsJson( $retValue );
	}

?>
