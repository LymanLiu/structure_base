<?php 
	include 'header.php';
	mysql_query("SET NAMES UTF8"); 

	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	$lang=$_POST['lang'];
	$id=$_POST['id'];
	$type=$_POST['type'];
	$orderID=$_POST['orderID'];
	$consignee = $_POST["consignee"];
	$address = $_POST["address"];
	$logisticsInfo = $_POST["logisticsInfo"];
	$tableName = 'orders';
	if($lang == 'cn') {
		$tableName = 'orders';
	} else {
		$tableName = 'en_orders';
	}
	if ($type == 'update') {
		mysql_query("UPDATE {$tableName} SET orderID={$orderID}, consignee='{$consignee}', address='{$address}',logisticsInfo='{$logisticsInfo}' WHERE id=${id}");
		$result = mysql_affected_rows();
	} else {
		$result = mysql_query("INSERT INTO {$tableName} ( orderID, consignee, address, logisticsInfo,inputTime) VALUES ({$orderID},'{$consignee}','{$address}','{$logisticsInfo}','{$time}')");
	}

	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>