<?php 
	header("Access-Control-Allow-Origin:*");

	//设置时区
	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	
	$conn = mysql_connect("localhost","cargoco1_mysql","a123456");
	mysql_select_db("cargoco1_mysql",$conn);
	mysql_query("SET NAMES UTF8");

	$title = $_POST["title"];
	$content = $_POST["content"];
	//执行一条SQL语句，SQL语句操作数据库的语句。SQL是独立的语言，PHP、JavaEE、.net、pethon都在用SQL语句
	$result = mysql_query("INSERT INTO news_business (title,content,time) VALUES ({$title},{$content},'{$time}')");
 
	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>