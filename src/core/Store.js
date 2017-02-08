import _ from 'underscore';
import storeCommunicationEvents from './storeCommunicationEvents.js';
export default class Store {

    constructor() {
        this.state = {};
        this.eventDefine = {};
        this.storeCommunicationEvents = {};
        this.storeObserver = $$.storeObserver;

        this.eventor = $$.eventor;

        this.registerEventToStoreObserver();

        this.listenEvents = {};
    }

    emit(method, ...options) {
        let fun = this.eventor[method](...options);
        return {
            with: (params) => {
                let name = fun(params);

                if (name) {
                    let funcs = params;
                    this.eventLoger({ name, funcs });
                }

            }
        };

    }

    getState() {
        return $$.utils.deepClone(this.state);
    }


    setState(state, toTrigger = true) {

        if (toTrigger) {

            this.trigger(state);
        }
        this.state = {...this.state, ...state };
    }


    onRemoveEvents() {
        for (let eventName in this.listenEvents) {
            if (this.eventor) {
                this.eventor.off(eventName, this.listenEvents[eventName]);
            }

            this.removeListenersToCommunicationEvents(eventName)(...this.listenEvents[eventName]);

        }
    }

    registerEventToStoreObserver() {
        this.storeCommunicationEvents = storeCommunicationEvents;
    }

    listenMulti(listenPkg) {
        for (var event in listenPkg) {
            this.addListenersToCommunicationEvent(event)(...listenPkg[event]);
        }
    }

    strategy(name) {
        let stragies = {

        };

        return stragies[name];
    }

    omitAutoRemoveEvents() {
        return [];
    }

    eventLoger({ name, funcs }) {

        if (!_.isArray(this.listenEvents[name])) {

            this.listenEvents[name] = [];
        }

        let omitEvents = this.omitAutoRemoveEvents();
        if (!~omitEvents.indexOf(name)) {
            this.listenEvents[name] = this.listenEvents[name].concat(...funcs);
        }
    }



    addListenersToCommunicationEvent(name) {

        if (!~this.storeCommunicationEvents[name]) {

            throw new Error(`communication event ${name} have not register`);

        }

        return (...funcs) => {
            funcs.forEach((fun) => {
                if (!_.isFunction(fun)) {
                    throw new Error(`${name}'s listeners must be function`);
                }
            });
            if (!_.isArray(this.storeObserver[name])) {

                this.storeObserver[name] = [];
            }

            this.storeObserver[name] = this.storeObserver[name].concat(...funcs);

            this.eventLoger({ name, funcs });


        };
    }

    removeListenersToCommunicationEvents(name) {
        if (!~this.storeCommunicationEvents[name]) {
            console.warn(`communication event ${name} have not register`);

        } else {

            return (...funcs) => {
                if (_.isArray(this.storeObserver[name])) {

                    this.storeObserver[name] = _.without(this.storeObserver[name], ...funcs);
                }
            };

        }

    }



    fireCommunicationEvent(name) {
        if (this.storeObserver[name]) {

            return (...args) => {

                this.storeObserver[name].forEach((func) => {
                    func(...args);
                });

            };

        } else {

            console.warn(`communication event ${name} have not listeners`);

            return () => {};

        }
    }


}
