// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.comModel = {};
        this.initModel();
    }

    initModel() {

        // $('h1').click(this.sayTest);
        
        // let header = new Header();
        // let footer = new Footer();


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };


        this.$aboutContainer = $('#aboutContainer');

        this.lang = ~location.href.indexOf('cn') ? 'cn' : 'en';

         $.get(this.getApi('aboutCompany'), {lang: this.lang}, (res) => {
            res = JSON.parse(res);
            this.$aboutContainer.html(res.list[0].content);
        });



        return this;
    }


}

new View();
