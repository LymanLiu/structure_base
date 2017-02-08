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
import Eventor from './Eventor.js';


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
        this.eventor = {};
        this._config = config;
        this._routeParams = {};

        this.LN = '';
        this.SEM = semantic;
        this.rawAPI = API;
        this.rawURL = URL;

        this.initEventor();

        return this;
    }

    initEventor() {
        this.eventor = new Eventor();
        return this;
    }

    getApi(name) {
        return this._config.apiHost() + this.rawAPI[name]();
    }

    listen(name, func) {

        if (this.observers[name] && !(~this.observers[name].indexOf(func))) {
            this.observers[name].push(func);
        } else {
            this.observers[name] = [func];
        }
    }

    unlisten(name, func) {
        var index = this.observers[name].indexOf(func);
        if (this.observers[name] && (~index)) {
            this.observers[name].slice(index, 1);
        }
    }

    fire(name, ...rest) {
        if (this.storeObserver[name]) {
            this.storeObserver[name].forEach(fun => fun(...rest));
        } else {
            throw Error(name + ': this event is not exsited');
        }
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
