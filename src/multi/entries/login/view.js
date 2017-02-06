import utils from '../../../core/utils';
import config from '../../../core/config';
import api from '../../../core/api';
import url from '../../../core/url';
import model from './model';
import SignForm from '../../logics/SignForm/view.js';

class View {
    constructor() {
        this.model = {};
        this.comModel = model;
        this._config = config;
        this.rawAPI = api;
        this.rawURL = url;
        this.signForm = new SignForm();
        this.api = {

        };

        this.url = {

        };

        utils.setRemRoot();

        this.signIn()
            .initModel();
        // .getDom()
        // .initEvent();
    }

    getDom() {
        return this;
    }

    signIn() {
        this.signForm.show('signIn');
        return this;
    }

    initEvent() {

        return this;
    }

    initModel() {
        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>',
                test: '....'
            }
        };

        return this;
    }


}

new View();
