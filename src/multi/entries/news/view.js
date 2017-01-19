import model from './model';
import MultiView from '../../../core/MultiView';
import Header from '../../logics/header/view.js';
import Footer from '../../logics/footer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.comModel = model;
        this.initEvent()
            .initModel();
    }

    initEvent() {

        $.get(this.getApi('getBusinessNews'), {page: 1}, (res) => {
            console.log(res, 1)
        })

        return this;
    }

    initModel() {

        // $('h1').click(this.sayTest);
        
        let header = new Header();
        let footer = new Footer();


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
