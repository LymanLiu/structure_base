import axios from 'axios';
import _ from 'underscore';
import Promise from 'bluebird';
import Router from './Router.js';
import config from './config.js';
import Application from 'core/Application';

class App extends Application {
    constructor() {

        super();

    }
    init() {
        var appDom = document.getElementById('app');
        this._init({ appDom, Router });

        return this;
    }


}

export default App;
