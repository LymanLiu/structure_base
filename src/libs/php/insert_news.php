<?php 
	include 'header.php';
    mysql_query("SET NAMES UTF8");
    
	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	$type=$_POST['type'];
	$title = $_POST["title"];
	$content = $_POST["content"];
	// $title = iconv('utf-8','gb2312', $_POST["title"]);
	// $content = iconv('utf-8','gb2312', $_POST["content"]);
	//执行一条SQL语句，SQL语句操作数据库的语句。SQL是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
 	if($type == 'business') {
		$result = mysql_query("INSERT INTO news_business (title,content,time) VALUES ('{$title}','{$content}','{$time}')");
	} else {
		$result = mysql_query("INSERT INTO news_company (title,content,time) VALUES ('{$title}','{$content}','{$time}')");
	}
	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>