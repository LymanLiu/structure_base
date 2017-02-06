import utils from '../../../core/utils';
import model from './model';
import App from '../../../core/application';

//ueditor
// import umeditorConfig from '../../../libs/ueditor/umeditor.config.js';
// import umeditor from '../../../libs/ueditor/umeditor.min.js';
// import zhcn from '../../../libs/ueditor/lang/zh-cn/zh-cn.js';

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