<!DOCTYPE html>
<html lang="en">
	<?- head ?>
<body class="bg-body">
	<?- header ?>
	<div class="s-main-banner">
		<div class="search-box">
			<input id="orderID" type="text">
			<button id="searchBtn"><?- SEARCH_BTN_TEXT ?></button>
		</div>
	</div>
	<div class="search-result wrapper">
		<h2>查询结果</h2>
		<div id="searchResult" class="search-detail">
			
		</div>
	</div>
	<?- footer ?>
	<script type="text/javascript" src="/static/js/multi/search.js"></script>
</body>
</html>