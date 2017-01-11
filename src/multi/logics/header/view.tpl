<div class="header">
	<div class="wrapper">
		<ul>
			<? navlist.forEach((item, i) => { ?>
				<? if(i === 0) { ?>
					<li class="cur"><a href="#"><?- item.name ?></a></li>
				<? } else { ?>
					<? if(item.child) { ?>
						<li>
							<a href="#"><?- item.name ?></a>
							<ul class="nav-slider">
								<? item.child.forEach((itemChild, j) => { ?>
									<li><a href="#"><?- itemChild ?></a></li>
								<? }) ?>
							</ul>
						</li>
					<? } else { ?>
						<li><a href="#"><?- item.name ?></a></li>
					<? } ?>
				<? } ?>
			<? }) ?>
		</ul>
		<!-- <div class="choose-lang">
			<div class="choose-lang-inner">
				<p>中文</p>
				<p>俄语</p>
				<i class="arror"></i>
			</div>
		</div> -->
		<div class="choose-lang">
			<select id="chooseLang">
				<option value="china">中文</option>
				<option value="russia">俄文</option>
			</select>
		</div>
	</div>
</div>