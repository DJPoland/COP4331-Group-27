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
    VALUES ($inData["firstname"], $inData["lastname"], $inData["login"], $inData["password"])";

    if ($conn->query($sql) === TRUE) {
      $retValue = '{firstName":"' . $inData["firstname"] . '","lastName":"' . $inData["lastname"] . '","Login":"' . $inData["login"] . '","Password":"' . $inData["password"] . '","error":""}';
  		sendResultInfoAsJson( $retValue );
    } else {
      $retValue = '{"firstName":"","lastName":"","Login":"","Password":"","error":"Sign Up Failed"}';
  		sendResultInfoAsJson( $retValue );
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

?>
