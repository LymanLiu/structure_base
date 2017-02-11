<?php
	include 'header.php';
	mysql_query("set character set 'utf8'");
	$orderID = intval($_GET['orderID']); //当前页 
	$query = mysql_query("SELECT * FROM orders WHERE orderID=$orderID"); //查询分页数据 
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
	

	mysql_close($conn);
?>
