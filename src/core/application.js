import React from 'react';
import { render } from 'react-dom';
import ReactAddons from 'react-addons';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import axios from 'axios';
import _ from 'underscore';
import Promise from 'bluebird';
import Router from '../core/Router.js';
import config from './config.js';
import semantic from './semantic.js';
import utils from "./utils.js";
import API from './api.js';
import URL from './url.js';


class Application {
    constructor() {
        this._appDom = null;
        this._config = null;
        this.observe = null;
        this.LN = '';
        this.utils = utils;


        this.init()
            .render();
    }

    define() {
        Object.defineProperty(this, 'config', {
            set: () => {
                return false;
            },
            get: () => {
                index
                return this._config;
            }
        });

        return this;

    }

    init() {

        this._appDom = document.getElementById('app');
        this.gState = {};
        this.observers = {};
        this.storeObserver = {};
        this._config = config;
        this._routeParams = {};

        this.LN = '';
        this.SEM = semantic;
        this.rawAPI = API;
        this.rawURL = URL;

        return this;
    }

    render() {
        injectTapEventPlugin();
            // console.log(!this._appDom.innerHTML, 33)
        // if (!this._appDom.innerHTML) {
            // console.log(Router, 11)
            render(<Router />, this._appDom);
        // }

        return this;
    }
}

export default Application