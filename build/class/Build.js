var fs = require('fs');
var path = require('path');
var stream = require('stream');
var _ = require('underscore');
var chalk = require('chalk');
var del = require('del');
var exec = require('child_process').exec;
var ejs = require('ejs');
ejs.delimiter = '?';


//import fs from "fs";
//import _ from "underscore";

class Build {

    constructor() {
        //declare
        this.taskMap = {};
        this.config = {};
        this.params = {};
        this.msg = '';
        this.root = '';

        //init
        this.initRoot()
            .initConfig()
            .initTaskMap();
    }



    //tasks
    buildDev() {
        var cmdStr = 'node build -a rebuild';
        exec(cmdStr, (err, stdout, stderr) => {

            if (err) {
                console.log('get weather api error:' + stderr);
            } else {
                /*
                这个stdout的内容就是上面我curl出来的这个东西：
                {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
                */
                var data = stdout;
                console.log(data);
            }

        });
    }
    rebuildSingleDebugRouter() {
        var comps = _.chain(this.getAllComponentsDirWith())
            .map((compDir) => {
                return {
                    component: compDir.split('/').pop(),
                    importDir: this.compareDir(this.config.singleComponentDir + '/' + compDir, this.config.singleDebugRouterDir),
                    path: compDir.toLowerCase(),
                };
            })
            .map((compObj) => {
                return [
                    `import ${compObj.component} from "${compObj.importDir}";`,
                    `{ component:${compObj.component}, path:"${compObj.path}" }`
                ];
            })
            .unzip()
            .map((strItems, key) => {

                return strItems.join(!key ? '\n' : ',\n    ');
            })
            .value();
        var strComps = comps.join('\n\nexport default [\n    ') + '\n];';
        var routerDir = this.root + this.config.singleDebugRouterDir;

        this.write(null, strComps, routerDir)
            .setMsg(chalk.green('ok => single dubug router success build: ') + chalk.yellow.underline(routerDir))
            .log();

        return this;
    }

    rebuildAppLess() {
        var appLessDir = this.root + this.config.appLessDir;
        var singlePathRelativeToAppLess = this.compareDir(this.root + this.config.singleComponentDir, appLessDir);

        var allComponentsDir = this.getAllComponentsDirWith(
            (compDir) => ('@import "' + singlePathRelativeToAppLess + '/' + compDir + '/index.less";'),
            (compDir) => ('@import "' + singlePathRelativeToAppLess + '/' + compDir + '/index.less";')
        );

        var writable = fs.createWriteStream(appLessDir);
        var readable = new stream.Readable;
        readable._read = () => {};
        readable.push(allComponentsDir.join('\n'));
        readable.pipe(writable);
        this.setMsg(chalk.green('ok => update app.less success (cmd+click): ') + chalk.yellow.underline(appLessDir)).log();

        return this;
    }


    createComponent(type, name) {
        var dir = this.config.singleBusinessComponentDir;

        if (type == 'share') {
            dir = this.config.singleShareComponentDir;
        } else if (type == 'business') {
            dir = this.config.singleBusinessComponentDir;
        }

        var root = this.root;
        var tpldir = root + this.config.singleTplDir;
        var newdir = root + dir + `/${name}`;

        if (!fs.existsSync(newdir)) {
            fs.mkdirSync(newdir, '0777');
        } else {
            throw new Error(chalk.red('fail => this component have alread exsited (cmd+click): ') + chalk.yellow.underline(newdir));
        }

        var files = fs.readdirSync(tpldir);

        files.map((filename) => {

            var tplfile = tpldir + '/' + filename;
            var newfile = newdir + '/' + filename;

            var tplstr = fs.readFileSync(tplfile, 'utf8');
            var data = {};
            var fArr = filename.split('.');

            if (~fArr.indexOf('less')) {
                var relativeDir = this.compareDir(this.root + this.config.coreLessDir, newfile);
                data = {
                    coreLessDir: relativeDir,
                    className: 'ori-' + name.toLowerCase() + '-root'
                };

            } else if ((~fArr.indexOf('js')) && (~fArr.indexOf('view'))) {
                data = {
                    componentName: name,
                    className: 'ori-' + name.toLowerCase() + '-root'
                };

            } else if (~fArr.indexOf('js') && ~fArr.indexOf('store')) {

                data = {
                    componentName: name
                };
            }


            tplstr = ejs.render(tplstr, { ori: data });

            this.write(null, tplstr, newfile);

        });

        this.setMsg(chalk.green('ok => success create component (cmd+click): ') + chalk.yellow.underline(newdir)).log()
            .rebuildAppLess()
            .rebuildSingleDebugRouter();



        return this;
    }

    deleteComponent(type, name) {
        var dir = this.config.singleBusinessComponentDir;
        if (type == 'share') {
            dir = this.config.singleShareComponentDir;
        } else if (type == 'business') {
            dir = this.config.singleBusinessComponentDir;
        }
        var root = path.dirname(path.dirname(path.dirname(__filename)));

        var componentDir = root + dir + `/${name}`;
        var msg = '';
        if (fs.existsSync(componentDir)) {

            del(componentDir, { force: true });

            msg = chalk.green('ok => success delete the component (cmd+click): ') + chalk.yellow.underline(componentDir);
        } else {
            throw new Error(chalk.red('fail => no component about to delete (cmd+click): ') + chalk.yellow.underline(componentDir));
        }
        this.setMsg(msg).log()
            .rebuildAppLess()
            .rebuildSingleDebugRouter();

        return this;


    }

    //util

    getAllComponentsDirWith(shareCallback, businessCallback) {
        shareCallback = shareCallback || ((compDir) => (compDir));
        businessCallback = businessCallback || ((compDir) => (compDir));


        var shareDir = this.root + this.config.singleShareComponentDir;
        var businDir = this.root + this.config.singleBusinessComponentDir;

        var shareLast = this.config.singleShareComponentDir.split('/').pop();
        var businLast = this.config.singleBusinessComponentDir.split('/').pop();

        var allComponentsDir = _.chain(fs.readdirSync(businDir))
            .filter((compName) => {
                return !/^\..+/g.test(compName);
            })
            .map((compName) => {
                return businessCallback(businLast + '/' + compName);
            })
            .union(
                _.chain(fs.readdirSync(shareDir))
                .filter((compName) => {
                    return !/^\..+/g.test(compName);
                })
                .map((compName) => {
                    return shareCallback(shareLast + '/' + compName);
                })
                .value()
            ).value();
        return allComponentsDir;
    }

    write(fromFilePath, withData, toFilePath) {

        var readable = new stream.Readable;
        var writable = fs.createWriteStream(toFilePath);

        if (fromFilePath) {
            readable = fs.createReadStream(fromFilePath);
        } else {
            readable._read = () => {};
        }

        if (withData) {

            readable.push(withData);
        }

        readable.pipe(writable);

        return this;
    }
    compareDir(beComparedFile, file) {

        var fArr = file.split('/');
        var beArr = beComparedFile.split('/');
        fArr.shift();
        beArr.shift();

        while (fArr && beArr && fArr[0] == beArr[0]) {
            fArr.shift();
            beArr.shift();
        }

        if (fArr.length > 1) {
            return new Array(fArr.length).join('../') + beArr.join('/');
        } else {
            return false;
        }

    }

    log() {

        console.log(this.msg);
        return this;
    }

    del(path) {

        var files = [];

        if (fs.existsSync(path)) {

            files = fs.readdirSync(path);

            files.forEach((file, index) => {

                var curPath = path + '/' + file;

                if (fs.statSync(curPath).isDirectory()) { // recurse

                    this.del(curPath);

                } else { // delete file

                    fs.unlinkSync(curPath);

                }

            });

            fs.rmdirSync(path);

        }

    }

    // run;
    switchTask() {
        var p = this.params;
        if (p['action']) {
            if (p['action'] == 'rebuild' && p['type'] == 'less') {

                return this.rebuildAppLess();

            } else if (p['action'] == 'rebuild' && p['type'] == 'sdr') {

                return this.rebuildSingleDebugRouter();

            } else if (p['action'] == 'rebuild') {

                return this.rebuildAppLess()
                    .rebuildSingleDebugRouter();

            } else if (p['action'] == 'dev') {

                return this.buildDev();

            }
        } else if (p['delete']) {

            p['type'] = p.type ? p.type : 'business';
            return this.deleteComponent(p.type, p.delete);


        } else if (p['create']) {

            p['type'] = p.type ? p.type : 'business';
            return this.createComponent(p.type, p.create);


        }

        throw new Error(chalk.red('fail => no task to run'));
    }

    run(params) {

        this.setParams(params)
            .transformParamsToClear()
            .switchTask();

        return this;

    }
    transformParamsToClear() {
        var clearParams = {};
        var clearKey = '';
        _.mapObject(this.params, (val, key) => {
            clearKey = this.taskMap[key];
            if (clearKey) {

                clearParams[clearKey] = val;
            } else {
                throw new Error(chalk.red('fail => taskMap have not declare this key'));
            }
        });

        this.params = clearParams;
        return this;
    }

    setParams(params) {
        this.params = params;

        return this;
    }

    setMsg(msg) {
        this.msg = msg;
        return this;
    }



    // init;
    initRoot() {
        this.root = path.dirname(path.dirname(path.dirname(__filename)));
        return this;
    }
    initConfig() {

        var config = fs.readFileSync('./etc/config.json', 'utf8');
        config = eval('(' + config + ')');

        this.config = _.extend({
            singleShareComponentDir: '',
            singleBusinessComponentDir: ''
        }, config);
        return this;
    }

    initTaskMap() {
        var json = fs.readFileSync('./etc/params.json', 'utf8');
        this.taskMap = eval('(' + json + ')');

        _.chain(this.taskMap).values().uniq().each((val, key) => {
            this.taskMap['--' + val] = val;
        });

        return this;
    }



}

module.exports = Build;
