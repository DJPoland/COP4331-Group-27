<?php
    $inData = getRequestInfo();
    $searchResults = "";
    $searCount = 0;

    // localhost, username, password, database
	$conn = new mysqli("localhost", "cop4331t_Shawn", "Penguin2020$", "cop4331t_shawnmm1_Group27");

    if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT FirstName from Contacts where FirstName like '%" . $inData["search"] . "%' and 
			UserID =". $inData["UserID"];
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
				$searchResults .= '"' . $row["FirstName"] . '"';
			}
		}
		else
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
?>