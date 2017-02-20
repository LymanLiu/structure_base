<div class="footer">
	<div class="wrapper">
		<ul>
			<? footerList.forEach((item, i) => { ?>
				<li>
					<h3><?- item.title ?></h3>
					<? item.content.forEach((child, i) => { ?>
						<a href="javascript:;"><?- child ?></a>
					<?})?>
				</li>
			<?})?>
		</ul>
		<div class="right-box">
			<h3>400-100-5678</h3>
			<p>Time: 8:00 - 18:00</p>
			<div class="btn-box">马上致电我们</div>
		</div>
		<div class="clear"></div>
	</div>
	<div class="footer-end">
		<div class="wrapper">
			Copyright ©2016 by GuangDong PHNIX Eco-Energy Solution LTD. All rights reserved
		</div>
	</div>
</div>