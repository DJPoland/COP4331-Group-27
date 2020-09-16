<?php
    $inData = getRequestInfo();
    $searchResults = "";
    $searchCount = 0;

    // localhost, username, password, database
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

    if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT FirstName, LastName, Email, Phone from Contacts where (FirstName like '%" . $inData["Search"] . "%' or LastName
			like '%" . $inData["Search"] . "%') and UserID =". $inData["UserID"];
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
				$searchResults .= '{firstName:"' . $row["FirstName"] . '",lastName:"' . $row["LastName"] . '",email:"' . $row["Email"] . '",phone:"' . $row["Phone"] .'"}';
			}
			returnWithInfo($searchResults);
		}
		else
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{error: "", results:[' . $searchResults . ']}';
		sendResultInfoAsJson( $retValue );
	}
?>
