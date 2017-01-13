import MultiView from '../../../core/MultiView';
import model from './model';

class View extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = model;
        this.initModel()
            .initEvent();
    }

    initEvent() {
        this.$navLis = $('.header .wrapper ul .level_1');
        this.$chooseLang = $('#chooseLang');
        this.$aDom = $('#header a');

        let lang = ~location.href.indexOf('cn') ? 'china' : 'russia';
        this.$chooseLang.val(lang);

        this.$navLis.click(function(event) {
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        this.$chooseLang.change(function(e) {
            var val = $(this).val();
            switch (val) {
                case 'china':
                    window.location.href = location.origin + location.pathname.replace('en', 'cn');
                    break;
                case 'russia':
                    window.location.href = location.origin + location.pathname.replace('cn', 'en');
                    break;
            }
        });

        this.initTab();
        return this;
    }

    initTab() {

        this.pageList = ['index', 'about', 'russia', 'ua', 'whiteRussia', 'serach', 'news', 'contact'];

        for (let i = 0; i < this.pageList.length; i++) {
            if( location.href.indexOf( this.pageList[i]) > -1 ) {
                console.log( this.$navLis)
                this.$navLis.eq(i).addClass('cur').siblings().removeClass('cur');
            }
        };
    }

    initModel() {
        this.model = {...this.model, ...{
            title: '<$- HOME $>'
        }};
        return this;
    }


}

export default View;
