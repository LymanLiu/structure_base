<?php
	include 'header.php';
	mysql_query("set character set 'utf8'");
	$id=$_GET['id'];
	$page = intval($_GET['page']); //当前页 
	$pageSize = intval($_GET['pageSize']); //每页显示数 
  
	$result = mysql_query("SELECT * FROM orders"); 
	$total = mysql_num_rows($result);//总记录数 
	$totalPage = ceil($total/$pageSize); //总页数 
	$startPage = ($page - 1)*$pageSize; //开始记录 
	//构造数组 
	$arr['total'] = $total; 
	$arr['pageSize'] = $pageSize; 
	$arr['totalPage'] = $totalPage; 
	if($id) {
		$query = mysql_query("SELECT * FROM orders WHERE id={$id}");  
	} else {
		$query = mysql_query("SELECT * FROM orders ORDER BY id DESC LIMIT $startPage,$pageSize"); //查询分页数据 
	}
	
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
