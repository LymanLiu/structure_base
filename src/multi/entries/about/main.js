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
            head: head.render({ less: 'about', title: '<$- RUSSIA_TITLE $>' }).html,
            header: header.render({num: 1}).html,
            footer: footer.render().html,
            ABOUT_TITLE_ONE: '<$- ABOUT_TITLE_ONE $>',
            ABOUT_TITLE_TWO: '<$- ABOUT_TITLE_TWO $>',
            ABOUT_TITLE_THREE: '<$- ABOUT_TITLE_THREE $>',
            ABOUT_TITLE_FOUR: '<$- ABOUT_TITLE_FOUR $>',
            ABOUT_CONTENT_ONE_1: '<$- ABOUT_CONTENT_ONE_1 $>',
            ABOUT_CONTENT_ONE_2: '<$- ABOUT_CONTENT_ONE_2 $>', 
            ABOUT_CONTENT_TWO: '<$- ABOUT_CONTENT_TWO $>', 
            ABOUT_CONTENT_THREE: '<$- ABOUT_CONTENT_THREE $>', 
            ABOUT_CONTENT_FOUR: '<$- ABOUT_CONTENT_FOUR $>', 
            ABOUT_TITLE: '<$- NAV_ABOUT $>'
        });

        return this;
    }

}

module.exports = Frame;
