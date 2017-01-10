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

        this.$navLis.click(function(event) {
            $(this).addClass('cur').siblings().removeClass('cur');
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
