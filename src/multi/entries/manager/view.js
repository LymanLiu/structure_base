import model from './model';
import App from '../../../core/application';
class View extends App {
    constructor() {
        super();
        this.comModel = model;
        this.initModel();
    }

    initModel() {


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

window.$$ = new View();