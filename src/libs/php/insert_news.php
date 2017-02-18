<?php 
	include 'header.php';
    mysql_query("SET NAMES UTF8");
    
	date_default_timezone_set('Asia/Shanghai'); 
	$time = date('20'.'y/m/d H:i:s',time());

	$lang=$_POST['lang'];
	$update=$_POST['update'];
	$type=$_POST['type'];
	$title = $_POST["title"];
	$content = $_POST["content"];

	$tableNameBus = 'news_business';
	$tableNameCom = 'news_company';
	if($lang == 'cn') {
		$tableNameBus = 'news_business';
		$tableNameCom = 'news_company';
	} elseif($lang == 'en') {
		$tableNameBus = 'en_news_business';
		$tableNameCom = 'en_news_company';
	}

	if($update) {
		$id=$_POST['id'];
		if($type == 'business') {
			mysql_query("UPDATE {$tableNameBus} SET title='{$title}', content='{$content}' WHERE id=${id}");
		} elseif ($type == 'company')  {
			mysql_query("UPDATE {$tableNameCom} SET title='{$title}', content='{$content}' WHERE id=${id}");
		}
		$result = mysql_affected_rows();
	} else {
	 	if($type == 'business') {
			$result = mysql_query("INSERT INTO {$tableNameBus}(title,content,time) VALUES ('{$title}','{$content}','{$time}')");
		} elseif ($type == 'company') {
			$result = mysql_query("INSERT INTO {$tableNameCom}(title,content,time) VALUES ('{$title}','{$content}','{$time}')");
		}
	}
	if($result == 1){
		echo 1;
	}else{
		echo 0;
	}
	//关闭数据库
	mysql_close($conn);
 ?>