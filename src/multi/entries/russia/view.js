import model from './model';
import MultiView from '../../../core/MultiView';
import Header from '../../logics/header/view.js';
import Footer from '../../logics/footer/view.js';
import SliderContainer from '../../logics/sliderContainer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.comModel = model;
        this.initModel();
    }

    initModel() {

        // $('h1').click(this.sayTest);
        
        let header = new Header();
        let footer = new Footer();
        let sliderContainer = new SliderContainer();


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
