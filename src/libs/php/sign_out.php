<?php
	header("Access-Control-Allow-Origin:*");
	unset($_SESSION['username']);
	unset($_SESSION['passcode']);
	unset($_SESSION['userflag']);
	echo "注销成功";
?>
