<ul id="mainBanner">
	<? bannerList.forEach((item, i) => { ?>
		<li 
			class="<?- i === 0 ? 'main-banner cur' : 'main-banner' ?>"
			style="background-image: url(<?- item.url ?>)"
		>
			<?- item.text ?>
		</li>
	<? }) ?>
</ul>