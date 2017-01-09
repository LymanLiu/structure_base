var through = require('through');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

function compareDir(beComparedFile, file) {

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

module.exports = function() {
    var entry = '';
    var less = '';
    return function(file) {

        var arr = file.split('/');
        if (entry) {
            if (arr[arr.length - 1] == 'index.js' && arr[arr.length - 4] == 'single') {
                let beComparedDir = path.dirname(file);
                process.stdout.write(chalk.red('.'));
                let requireDir = compareDir(beComparedDir, entry);
                let requireLess = `${requireDir}/index.less`;
                if (!~less.indexOf(requireLess)) {
                    let importDir = `@import '${requireLess}';\n`;
                    less += importDir;
                    fs.appendFileSync(path.dirname(entry) + '/single.less', importDir);
                }


            }
        } else {

            entry = file;
            try {
                if (fs.statSync(path.dirname(entry) + '/single.less').isFile()) {
                    fs.unlinkSync(path.dirname(entry) + '/single.less');
                };
            } catch (e) {}
        }



        return through()
    };

};
