//node
const fs = require('fs');
const _ = require('underscore');

//core
const MultiMain = require('../../../core/MultiMain.js');

//inner
const Head = require('../../logics/head');
const SignForm = require('../../logics/SignForm');

class Frame extends MultiMain {

    constructor() {
        super();
        this.comModel = require('./model.js');
        this.model = {};
        this.tpl = fs.readFileSync(`${__dirname}/view.tpl`, 'utf8');
        this.initModel();
    }

    initModel() {
        let head = new Head();
        let signForm = new SignForm();

        this.model = _.extend(this.model, {
            head: head.render({ less: 'login', title: '<$- RUSSIA_TITLE $>' }).html,
            signForm: signForm.render({title: '<$- MANAGER_TITLE $>' }).html
        });

        return this;
    }

}

module.exports = Frame;
