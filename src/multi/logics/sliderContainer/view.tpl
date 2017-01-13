<dl class="slider-container">
	<dt>
		<h3><?- title ?></h3>
		<ul>
			<? sliderList.forEach((item, i) => { ?>
				<? if(i === 0) { ?> 
					<li class="cur"><?- item ?></li>
				<?} else {?>
					<li ><?- item ?></li>
				<? } ?>
			<?})?>
		</ul>
	</dt>
	<dd>
		<? contentList.forEach((item, i) => { ?>
			<? if(i === 0) { ?> 
				<li class="cur"><?- item ?></li>
			<?} else {?>
				<li ><?- item ?></li>
			<? } ?>
		<?})?>
	</dd>
</dl>
<div class="clear"></div>