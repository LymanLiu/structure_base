<dl class="slider-container wrapper">
	<dt>
		<h3 class="title"><?- sliderData.title ?></h3>
		<ul class="slider">
			<? sliderData.sliderList.forEach((item, i) => { ?>
				<? if(i === 0) { ?> 
					<li class="cur"><?- item ?></li>
				<?} else {?>
					<li ><?- item ?></li>
				<? } ?>
			<? }) ?>
		</ul>
	</dt>
	<dd>
		<ul class="content">
			<? sliderData.contentList.forEach((content, i) => { ?>
				
				<li id="content<?- i ?>" class="<?- i === 0 ? "level_1 cur" : "level_1" ?>" >
					<div class="content-page-1">
						<img src="/static/images/multi/entries/russia/images/main-bg-<?- content.pageOne.img ?>.jpg" alt="">
						<? content.pageOne.pageText.forEach((text, i) => { ?>
							<p class=<?- i === content.pageOne.pageText.length-1 ? "teshu" : "" ?> > <?- text ?></p>
						<? }) ?>
					</div>
					<div class="content-page-2">
						<? content.pageTwo.forEach((second, i) => { ?>
							<div class="inner">
								<h3 class="russia-title"><?- second.title ?></h3>
								<ol>
									<? second.content.forEach((item, i) => { ?>
									<li><?- item ?></li>
									<? }) ?>
								</ol>
							</div>
						<? }) ?>
					</div>
					<div class="content-page-3">
						<h3 class="russia-title">三 俄罗斯双清关可到达城市 <span>(您可提供客户的英文或俄语地址，让客服协助查询，并告知运价、时效等。)</span></h3>
						<table class="russia-table">
							<? content.pageThree.forEach((trList, i) => { ?>
								<tr>
									<? trList.forEach((td, i) => { ?>
										<td width="25%"><?- td ?></td>
									<? }) ?>
								</tr>
							<? }) ?>
						</table>
					</div>
					<div class="content-page-4">
						<?- i === 1 ? '<h3 class="russia-title">四、口岸可直达城市：</h3>' : '' ?>
						<table class="russia-table">
							<? content.pageFour.forEach((trList, i) => { ?>
								<tr>
									<? trList.forEach((td, i) => { ?>
										<td width="25%"><?- td ?></td>
									<? }) ?>
								</tr>
							<? }) ?>
						</table>
					</div>
				</li>
			
			<? }) ?>
		</ul>
	</dd>
</dl>
<div class="clear"></div>