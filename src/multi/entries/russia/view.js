// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
// import SliderContainer from '../../logics/sliderContainer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = {};
        this.initModel();
    }

    initModel() {

        // $('h1').click(this.sayTest);
        
        // let header = new Header();
        // let footer = new Footer();
        // let sliderContainer = new SliderContainer();


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

class SliderContainer extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = {};
        this.initEvent()
            .initModel();
    }

    initEvent() {
        this.$sliderNav = $('.slider-container .slider li');
        this.$sliderCon = $('.slider-container .content .level_1');
        this.$titleImg = $('#mainBanner li');
        var self = this;
        this.$sliderNav.click(function(event) {
            let url = `url(/static/images/multi/entries/russia/images/main-banner-${$(this).index()+1}.jpg)`;
            $(this).addClass('cur').siblings().removeClass('cur');
            self.$sliderCon.eq($(this).index()).addClass('cur').siblings().removeClass('cur');
            self.$titleImg.eq($(this).index()).addClass('cur').siblings().removeClass('cur');
        });
        return this;
    }

    initModel() {
        this.model = {...this.comModel, ...{
            title: '<$- HOME $>'
        }};
        return this;
    }


}

new SliderContainer();

new View();
