import api from './api.js';
import config from './config.js';
module.exports = class {
    constructor() {
    	this.api = api;
    	this.config = config;
    }

    getApi(name) {
    	return this.config.apiHost() + this.api[name]();
    }

    sayTest() {
        console.log('hello')
    }
}
