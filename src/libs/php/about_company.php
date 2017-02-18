<?php 
	include 'header.php';
	mysql_query("SET NAMES UTF8"); 

	if($_POST['lang']) {
		$lang= $_POST['lang'];
		$content = $_POST["content"];
		$type = $_POST["type"];
		if($lang == 'cn') {
			$tableName = 'about_company';
		} else {
			$tableName = 'en_about_company';
		}
		if ($type == 'update') {
			mysql_query("UPDATE {$tableName} SET content='{$content}' WHERE id=1");
			$result = mysql_affected_rows();
		} else {
			$result = mysql_query("INSERT INTO {$tableName} ( content ) VALUES ('{$content}')");
		}

		if($result == 1){
			echo 1;
		}else{
			echo 0;
		}
	} else {
		$lang= $_GET['lang'];
		if($lang == 'cn') {
			$tableName = 'about_company';
		} else {
			$tableName = 'en_about_company';
		}

		$query = mysql_query("SELECT * FROM {$tableName} WHERE id=1");
		$row=mysql_fetch_array($query);
		$arr['list'][] = array( 
		  'content' => $row['content']
		);
		
		echo json_encode ( $arr );
	}

	
	//关闭数据库
	mysql_close($conn);
 ?>