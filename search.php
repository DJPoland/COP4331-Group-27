<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	//                   localhost,      db username,    db password,           db name
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "select Name from Users where Name like '%" . $inData["Search"] . "%' and UserID=" . $inData["UserId"];
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["Name"] . '"';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
