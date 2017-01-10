<div class="header">
	<div class="wrapper">
		<ul>
			<? navlist.forEach((item, i) => { ?>
				<? if(i === 0) { ?>
					<li class="cur"><?- item.name ?></li>
				<? } else { ?>
					<li><?- item.name ?></li>
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
			<select name="" id="">
				<option value="">中文</option>
				<option value="">俄文</option>
			</select>
		</div>
	</div>
</div>