// import model from './model';
import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
class View {
    constructor() {
        // super();
        // this.comModel = model;
        this.initModel();
    }

    say() {
        alert('say')
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

        return this;
    }


}

new View();
// require('../../../core/MultiView')
class Haha extends View {
    constructor() {
        super();
        // this.comModel = model;
        // this.initModel();
    }
}
new Haha().say()
