//node
const fs = require('fs');
const _ = require('underscore');

//core
const MultiMain = require('../../../core/MultiMain.js');

//inner

//component
const Head = require('../../logics/head');
const Header = require('../../logics/header');
const Footer = require('../../logics/footer');
const IndexContainer = require('../../logics/indexContainer');


class Main extends MultiMain {

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
        let indexContainer = new IndexContainer();

        this.model = _.extend(this.model, {
            head: head.render({ less: 'index', title: '<$- INDEX_TITLE $>' }).html,
            header: header.render().html,
            footer: footer.render().html,
            indexContainer: indexContainer.render().html,
        });

        return this;
    }
}

module.exports = Main;
