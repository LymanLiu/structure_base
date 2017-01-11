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
        this.$navLis = $('.header .wrapper ul li');
        this.$chooseLang = $('#chooseLang');

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
        })
        return this;
    }

    initModel() {
        this.model = {...this.model, ...{
            title: '<$- HOME $>'
        }};
        this.model = {...this.model,
            ... {
                title: '<$- HOME $>'
            }
        };
        return this;
    }


}

export default View;
