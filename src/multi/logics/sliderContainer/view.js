import MultiView from '../../../core/MultiView';
import model from './model';

class View extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = model;
        this.initEvent()
            .initModel();
    }

    initEvent() {
        this.$sliderNav = $('.slider-container .slider li');
        this.$sliderCon = $('.slider-container .content .level_1');
        this.$titleImg = $('.r-main-banner');
        var self = this;
        this.$sliderNav.click(function(event) {
            let url = `url(/static/images/multi/entries/russia/images/main-banner-${$(this).index()+1}.jpg)`;
            $(this).addClass('cur').siblings().removeClass('cur');
            self.$sliderCon.eq($(this).index()).addClass('cur').siblings().removeClass('cur');
            self.$titleImg.css('backgroundImage', url)
        });
        return this;
    }

    initModel() {
        this.model = {...this.model, ...{
            title: '<$- HOME $>'
        }};
        return this;
    }


}

export default View;
