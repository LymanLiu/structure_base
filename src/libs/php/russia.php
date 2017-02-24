<?php 
	include 'header.php';
	mysql_query("SET NAMES UTF8"); 

	if($_POST['name']) {
		$name = $_POST["name"];
		$content = $_POST["content"];
	
		mysql_query("UPDATE russia SET content='{$content}' WHERE name='{$name}'");
		$result = mysql_affected_rows();
	
		if($result == 1){
			echo 1;
		}else{
			echo 0;
		}
	} else {
		$name = $_GET["name"];
		$query = mysql_query("SELECT * FROM russia WHERE name='${name}'");
		$row=mysql_fetch_array($query);
		$arr['list'][] = array( 
		  'content' => $row['content']
		);
		
		echo json_encode ( $arr );
	}

	
	//关闭数据库
	mysql_close($conn);
 ?>