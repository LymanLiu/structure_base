//node
const fs = require('fs');
const _ = require('underscore');

//core
const MultiMain = require('../../../core/MultiMain.js');

//inner
const Head = require('../../logics/head');
const Header = require('../../logics/header');
const Footer = require('../../logics/footer');

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
        let header = new Header();
        let footer = new Footer();

        this.model = _.extend(this.model, {
            head: head.render({ less: 'search', title: '<$- RUSSIA_TITLE $>' }).html,
            header: header.render({num: 5}).html,
            footer: footer.render().html,
            SEARCH_BTN_TEXT: '<$- SEARCH_BTN_TEXT $>'
        });

        return this;
    }

}

module.exports = Frame;
