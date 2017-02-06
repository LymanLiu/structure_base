import utils from '../../../core/utils';
import model from './model';
import App from '../../../core/application';
class View extends App {
    constructor() {
        super();
        this.comModel = model;

        utils.setRemRoot();
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