let ex = null;
if (global.window) {
    ex = require('./view.js');
} else {
    ex = require('./main.js');
}


module.exports = ex;
