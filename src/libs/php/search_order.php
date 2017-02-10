<?php
	include 'header.php';

	$orderID = intval($_GET['orderID']); //当前页 
	$query = mysql_query("SELECT * FROM orders ORDER BY $orderID"); //查询分页数据 
	
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

	mysql_close($conn);
?>
