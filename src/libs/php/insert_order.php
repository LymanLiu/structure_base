<?php 
	include 'header.php';
	mysql_query("SET NAMES UTF8"); 

	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	$orderID=$_POST['orderID'];
	$consignee = $_POST["consignee"];
	$address = $_POST["address"];
	$logisticsInfo = $_POST["logisticsInfo"];
	$result = mysql_query("INSERT INTO orders ( orderID, consignee, address, logisticsInfo,inputTime) VALUES ({$orderID},'{$consignee}','{$address}','{$logisticsInfo}','{$time}')");

	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>