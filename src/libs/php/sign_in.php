<?php
    header("Access-Control-Allow-Origin:*");
	
    $conn = mysql_connect("localhost","cargoco1_mysql","a123456");
	mysql_select_db("cargoco1_mysql",$conn);
	mysql_query("SET NAMES UTF8");
    //获取输入的信息
    $username = $_POST['username'];
    $passcode = $_POST['passcode'];
    //获取session的值
    $query = @mysql_query("select username,userflag from users where username = '$username' and passcode = '$passcode'")
    or die("SQL语句执行失败");
    //判断用户以及密码
    if($row = mysql_fetch_array($query)) {
        session_start();
        //判断权限
        if($row['userflag'] == 1 or $row['userflag'] == 0){
            $_SESSION['username'] = $row['username'];
            $_SESSION['userflag'] = $row['userflag'];
            echo '{code: 1, result: "ok"}';
        }else{
            echo '{code: 403002, result: "user or password error"}';
        }

    }else{
        echo '{code: 404001, result: "not user"}';
    }
?>