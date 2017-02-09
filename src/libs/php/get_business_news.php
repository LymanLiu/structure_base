<?php 
    header("Access-Control-Allow-Origin:*");
	
	$conn = mysql_connect("localhost","cargoco1_mysql","a123456");
	mysql_select_db("cargoco1_mysql",$conn);
	mysql_query("SET NAMES UTF8");
	
	$page = intval($_GET['page']); //当前页 
	$pageSize = intval($_GET['pageSize']); //每页显示数 
  
	$result = mysql_query("SELECT * FROM news_business"); 
	$total = mysql_num_rows($result);//总记录数 
	$totalPage = ceil($total/$pageSize); //总页数 
	$startPage = ($page - 1)*$pageSize; //开始记录 
	//构造数组 
	$arr['total'] = $total; 
	$arr['pageSize'] = $pageSize; 
	$arr['totalPage'] = $totalPage; 
	$query = mysql_query("SELECT * FROM news_business ORDER BY id ASC LIMIT 
	$startPage,$pageSize"); //查询分页数据 
	while($row=mysql_fetch_array($query)){ 
	  $arr['list'][] = array( 
	  'id' => $row['id'], 
	  'title' => $row['title'], 
	  'content' => $row['content'], 
	  'time' => $row['time'], 
	  ); 
	} 
	echo json_encode($arr);

	mysql_close($conn);
 ?>