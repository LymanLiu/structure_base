import _ from 'underscore';
import MultiView from '../../../core/MultiView';
import model from './model';

import { individualCms } from '../../../core/url.js';
class View extends MultiView {
    constructor() {
        super();
        this.compId = '<?- name ?>';
        this.model = {};
        this.comModel = model;
        this.initModel();
    }

    initModel() {
        this.model = _.extend(this.model, {
            title: '<$- HOME $>',
            linkGallery: '',
            needJsJump: false,
        });
        return this;
    }


}

export default View;
