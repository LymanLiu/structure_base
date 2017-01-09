var _ = require('underscore');
var stream = require('stream');
var fs = require('fs');
//import _ from 'underscore';
class Command {
    constructor() {
        this.argv = '';
        this.params = '';
        this.doc = '';


        this.logCmd()
            .logErr()
            .initFromCLI()
            .transeformParams();
    }

    initFromCLI() {
        this.argv = process.argv.slice(2);

        return this;
    }

    logCmd() {
        var arr = _.clone(process.argv);
        arr[0] = arr[0].split('/').pop();
        arr[1] = arr[1].split('/').pop();

        fs.writeFileSync('./log/cmd.log', arr.join(' ') + ' # ' + this.getTime() + ' \n', { encoding: 'utf8', flag: 'a+' });

        return this;
    }
    logErr() {
        process.on('uncaughtException', (err) => {

            console.log(err);

            fs.writeFileSync('./log/err.log', '[ ' + this.getTime() + ' ] => ' + err.stack + ' \n\n', { flag: 'a+' });

        });


        return this;
    }

    getTime() {
        Date.prototype.Format = function(fmt) {
            var o = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() + 3) / 3),
                'S': this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            return fmt;
        };

        return new Date().Format('yyyy-MM-dd hh:mm:ss');
    }



    transeformParams() {
        var rawParams = this.argv;
        var partParams = _.chain(rawParams).partition(function(val, key, obj) {
            return !(key % 2);
        }).value();

        var zipParams = _.zip.apply(null, partParams);

        var objParams = _.object(zipParams);

        this.params = objParams;

        return this;
    }


    getDocs() {
        return this.doc;
    }

    getParams() {
        return _.clone(this.params);
    }

}

module.exports = Command;
