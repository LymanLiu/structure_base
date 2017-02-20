<?php
	include 'header.php';
	mysql_query("set character set 'utf8'");
	$lang = intval($_GET['lang']); 
	$orderID = intval($_GET['orderID']); 
	if($lang == 'both') {
		$query1 = mysql_query("SELECT * FROM orders WHERE orderID=$orderID"); 
		$query2 = mysql_query("SELECT * FROM en_orders WHERE orderID=$orderID"); 
		if(mysql_num_rows($query1) > 0 || mysql_num_rows($query2) > 0 ){ 
		 	if(mysql_num_rows($query1) > 0) {
		 		while($row=mysql_fetch_array($query1)){ 
				  $arr['list_cn'][] = array( 
				  'id' => $row['id'], 
				  'orderID' => $row['orderID'], 
				  'consignee' => $row['consignee'], 
				  'address' => $row['address'], 
				  'logisticsInfo' => $row['logisticsInfo'], 
				  'inputTime' => $row['inputTime'], 
				  ); 
				} 
		 	}

		 	if(mysql_num_rows($query2) > 0) {
		 		while($row=mysql_fetch_array($query2)){ 
				  $arr['list_en'][] = array( 
				  'id' => $row['id'], 
				  'orderID' => $row['orderID'], 
				  'consignee' => $row['consignee'], 
				  'address' => $row['address'], 
				  'logisticsInfo' => $row['logisticsInfo'], 
				  'inputTime' => $row['inputTime'], 
				  ); 
				} 
		 	}
			echo json_encode($arr);

		} else {
		 	echo 0;
		}
		
	} else {
		if($lang == 'cn') {
			$tableName = 'orders';
		} elseif($lang == 'en') {
			$tableName = 'en_orders';
		} 

		$query = mysql_query("SELECT * FROM {$tableName} WHERE orderID=$orderID"); 
	
		if(mysql_num_rows($query) > 0){ 
		 	while($row=mysql_fetch_array($query)){ 
			  $arr['list'][] = array( 
			  'id' => $row['id'], 
			  'orderID' => $row['orderID'], 
			  'consignee' => $row['consignee'], 
			  'address' => $row['address'], 
			  'logisticsInfo' => $row['logisticsInfo'], 
			  'inputTime' => $row['inputTime'], 
			  ); 
			} 
			echo json_encode($arr);
		} else {
		 	echo 0;
		}
		
	}

	

	mysql_close($conn);
?>
