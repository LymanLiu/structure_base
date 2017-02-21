<?php 
	include 'header.php';
	mysql_query("SET NAMES UTF8"); 


		$lang= $_GET['lang'];
		if($lang == 'cn') {
			$tableName = 'banner_img';
		} else {
			$tableName = 'en_banner_img';
		}

		$query = mysql_query("SELECT * FROM {$tableName} ORDER BY id");
		while ($row=mysql_fetch_array($query)) {
			$arr['list'][] = array( 
			  'id' => $row['id'],
			  'pic' => $row['pic'],
			  'name' => $row['name']
			);
		}
		echo json_encode ( $arr );

	
	//关闭数据库
	mysql_close($conn);
 ?>