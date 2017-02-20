<!DOCTYPE html>
<html lang="en">
	<?- head ?>
<body class="bg-body">
	<?- header ?>
	<div class="n-main-banner main-banner"><?- news_center ?></div>
	<ul class="new-list wrapper">
		<li class="level_1">
			<h3 class="title-box">行业资讯</h3>
			<ul class="list-box" id="businessNews">
				<li class="item">
					<div class="content-box">
                        暂时没有新闻
                    </div>
                </li>
			</ul>
			<span class="more-btn" id="businessMore">查看更多</span>
		</li>
		<li class="level_1 right-box">
			<h3 class="title-box">公司新闻</h3>
			<ul class="list-box" id="companyNews">
				<li class="item">
					<div class="content-box">
                        暂时没有新闻
                    </div>
                </li>
			</ul>
			<span class="more-btn" id="companyMore">查看更多</span>
		</li>
	</ul>
	<?- footer ?>
	<script type="text/javascript" src="/static/js/multi/news.js"></script>
</body>
</html>