<?php 
	include 'header.php';
    mysql_query("SET NAMES UTF8");
    $tableName = 'banner_img';
	// $action = $_GET['act']; 
	// if($action=='delimg'){ //删除图片 
	//     $filename = $_POST['imagename']; 
	//     if(!empty($filename)){ 
	//         unlink('files/'.$filename); 
	//         echo '1'; 
	//     }else{ 
	//         echo '删除失败.'; 
	//     } 
	// }else{ //上传图片 
    
    // print_r($_FILES['file']);
    	$newname = $_POST['name'];
	    $picname = $_FILES['file']['name']; 
	    $picsize = $_FILES['file']['size']; 
	    // if ($picname != "") { 
	        // if ($picsize > 512000) { //限制上传大小 
	        //     echo '图片大小不能超过500k'; 
	        //     exit; 
	        // } 
	        $type = strstr($picname, '.'); //限制上传格式 
	        // if ($type != ".gif" && $type != ".jpg", $type != ".png", $type != ".jpeg") { 
	        //     echo '图片格式不对！'; 
	        //     exit; 
	        // } 
	        $rand = rand(100, 999); 
	        $pics = date("YmdHis") . $rand . $type; //命名图片名称
	        //上传路径 
	        $pic_path = "../upload/". $pics; 
	    // } 
	       if(move_uploaded_file($_FILES['file']['tmp_name'], $pic_path)) {
	   //     		if ($type == 'update') {
				// 	mysql_query("UPDATE {$tableName} SET name='{$newname}', WHERE name=${oldname}");
				// 	$result = mysql_affected_rows();
				// } else {
					$result = mysql_query("INSERT INTO {$tableName} ( name, pic ) VALUES ('{$picname}','{$pics}')");
				// }

				if($result == 1) {
				    $size = round($picsize/1024,2); //转换成kb 
				    $arr = array( 
				    	'isSuccess'=>true,
				        'name'=>$picname, 
				        'pic'=>$pics, 
				        'size'=>$size 
				    ); 
				    echo json_encode($arr); //输出json数据 
					
				} else {
					$arr = array( 
			        	'errType'=>'sql failed'
				    ); 
				    echo json_encode($arr);
				}
	       } else {

	       		$arr = array( 
			        'errType'=>'path failed'
			    ); 
			    echo json_encode($arr);
	       }
	// }
	//关闭数据库
	mysql_close($conn);

?>
