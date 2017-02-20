<div class="header <?- headerCss ?>" id="header">
	<div class="wrapper">
		<ul>
			<? navlist.forEach((item, i) => { ?>
				<? if(item.child) { ?>
					<li class="<?- i === num ? "level_1 cur" : "level_1" ?>" >
						<a href="<?- item.url ?>" ><?- item.name ?></a>
						<ul class="nav-slider">
							<? item.child.forEach((itemChild, j) => { ?>
								<li><a href="<?- itemChild.url ?>"><?- itemChild.name ?></a></li>
							<? }) ?>
						</ul>
					</li>
				<? } else { ?>
					<li class="<?- i === num ? "level_1 cur" : "level_1" ?>" ><a href="<?- item.url ?>" ><?- item.name ?></a></li>
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
				<option value="russia">русский</option>
			</select>
		</div>
	</div>
</div>