<?php
    include 'header.php';

    $username = test_input($_POST["username"]);
    $password = test_input($_POST["password"]);

    function test_input($data){
        $data = trim($data); //去除用户输入数据中不必要的字符 (如：空格，tab，换行)。
        $data = stripslashes($data); // 去除用户输入数据中的反斜杠 (\)
        $data = htmlspecialchars($data); //保存为HTML转义代码,防止xss
        return $data;
    }

    $userOld = mysql_query("SELECT * FROM users WHERE username = '{$username}' AND password = '{$password}'");
    $number = mysql_num_rows($userOld);
    if($number == 1){
        session_start();
        $row = mysql_fetch_array($userOld);
        $_SESSION['username'] = $row['username'];
        $arr['code'] = 1;
        $arr['username'] = $row['username'];
        echo json_encode ( $arr );
        exit();
    }else{
        $arr['code'] = 403002;
        $arr['reust'] = 'user or password error';
        echo json_encode ( $arr );
    }

    // //判断用户以及密码
    // if($row = mysql_fetch_array($userOld)) {
    //     session_start();
    //     //判断权限
    //     if($row['userflag'] == 1 or $row['userflag'] == 0){
    //         $_SESSION['username'] = $row['username'];
    //         $_SESSION['userflag'] = $row['userflag'];
    //         echo '{code: 1, result: "ok"}';
    //     }else{
    //         echo '{code: 403002, result: "user or password error"}';
    //     }

    // }else{
    //     echo '{code: 404001, result: "not user"}';
    // }
    // 
    mysql_close($conn);
?>