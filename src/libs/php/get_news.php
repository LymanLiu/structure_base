<?php 
    include 'header.php';
	mysql_query("set character set 'utf8'");
	$type=$_GET['type'];
	$id=$_GET['id'];
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
	if($type == 'business') {
		if($id) {
			$query = mysql_query("SELECT * FROM news_business WHERE id={$id}");  
		} else {
			$query = mysql_query("SELECT * FROM news_business ORDER BY id DESC LIMIT $startPage,$pageSize"); //查询分页数据 
		}
	} else {
		if($id) {
			$query = mysql_query("SELECT * FROM news_company WHERE id={$id}");
		} else {
			$query = mysql_query("SELECT * FROM news_company ORDER BY id DESC LIMIT $startPage,$pageSize"); //查询分页数据 
		}
	}
	while($row=mysql_fetch_array($query)){ 
	  $arr['list'][] = array( 
	  'id' => $row['id'], 
	  'title' => $row['title'], 
	  'content' => $row['content'], 
	  'time' => $row['time'], 
	  ); 
	} 

    echo json_encode ( $arr );
	mysql_close($conn);
 ?>