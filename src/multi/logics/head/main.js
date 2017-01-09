//node
const fs = require('fs');
const _ = require('underscore');

//core
const MultiMain = require('../../../core/MultiMain.js');

//inner


class Frame extends MultiMain {

    constructor() {
        super();
        this.comModel = require('./model.js');
        this.model = {};
        this.tpl = fs.readFileSync(`${__dirname}/view.tpl`, 'utf8');
        this.initModel();
    }

    initModel() {
        this.model = _.extend(this.model, {
            title: '',
            linkGallery: '',
            needJsJump: false,
            less: '',

        });
    }

}

module.exports = Frame;
