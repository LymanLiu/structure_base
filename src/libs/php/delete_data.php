<?php 
	include 'header.php';
    mysql_query("SET NAMES UTF8");
    
	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	$type=$_POST['type'];
	$id=$_POST['id'];
	// $title = iconv('utf-8','gb2312', $_POST["title"]);
	// $content = iconv('utf-8','gb2312', $_POST["content"]);
	//执行一条SQL语句，SQL语句操作数据库的语句。SQL是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
 	if($type == 'business') {
		$result = mysql_query("DELETE FROM news_business WHERE id={$id}");
	} else if($type == 'company'){
		$result = mysql_query("DELETE FROM news_company WHERE id={$id}");
	} else if ($type == 'order') {
		$result = mysql_query("DELETE FROM orders WHERE id={$id}");
	} else {
		$result = 0;
	}

	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>