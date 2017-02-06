const ejs = require('ejs');
const _ = require('underscore');
const fs = require('fs');


module.exports = class {
    constructor() {
        this.ejs = ejs;

        this.langs = ['en', 'cn'];
        this.mainLanguage = 'en';


        this.model = {};
        this.tpl = '';
        this.htmls = {};
        this.html = '';
    }
    setDelimiter(limiter) {
        this.ejs.delimiter = limiter;
        return this;
    }

    render(props) {
        this.html = this.setDelimiter('?').ejs.render(this.tpl, _.extend(this.model, props));

        return this;

    }

    renderByLanguage(lang) {
        var strMainLang = fs.readFileSync(`${__dirname}/../etc/lang/${this.mainLanguage}.lang`, 'utf8');
        let oLang = _.extend(eval('(' + strMainLang + ')'), eval('(' + fs.readFileSync(`${__dirname}/../etc/lang/${lang}.lang`, 'utf8') + ')'));

        this.htmls[lang] = this.setDelimiter('$').ejs.render(this.html, oLang);


        return this;
    }
};
