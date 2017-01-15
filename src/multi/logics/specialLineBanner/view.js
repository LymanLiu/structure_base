import MultiView from '../../../core/MultiView';
import model from './model';

class View extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = model;
        this.initModel();
    }

    initModel() {
        this.model = {...this.model, ...{
            title: '<$- HOME $>'
        }};
        return this;
    }


}

export default View;
