import model from './model';
import MultiView from '../../../core/MultiView';
class View extends MultiView {
    constructor() {
        super();
        this.comModel = model;
        this.initModel();
    }

    initModel() {

        $('h1').click(this.sayTest);

        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
