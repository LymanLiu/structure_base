import Reflux from 'reflux';
import _ from 'underscore';
import axios from 'prv_modules/axios';
import RootStore from '../../../core/Store.js';
const self = class store extends RootStore {
    constructor(actions, type) {
        super();
        if (type != 'self') {

            return Reflux.createStore(new self(actions, 'self'));

        } else {

            return _.chain(actions)
                .keys()
                .map((actName) => {
                    var funName = actName.replace(/(\w)/, (v) => ('on' + v.toUpperCase()));
                    return [funName, this[funName]];
                })
                .object()
                .extend({
                    listenables: actions,
                    emit: this.emit,
                    eventor: this.eventor,
                    onRemoveEvents: this.onRemoveEvents,
                    init: this.init,
                    omitAutoRemoveEvents: this.omitAutoRemoveEvents,
                    eventLoger: this.eventLoger,
                    removeListenersToCommunicationEvents: this.removeListenersToCommunicationEvents,
                    listenEvents: this.listenEvents,
                    setState: this.setState,
                    getState: this.getState,

                    registerEventToStoreObserver: this.registerEventToStoreObserver,
                    addListenersToCommunicationEvent: this.addListenersToCommunicationEvent,
                    fireCommunicationEvent: this.fireCommunicationEvent,
                    storeCommunicationEvents: this.storeCommunicationEvents,
                    storeObserver: this.storeObserver,
                    listenMulti: this.listenMulti,
                    strategy: this.strategy

                })
                .value();
        }
    }

    onTest(text) {
        this.emit('upd', '/components/TestSecond/state/:key', {
            key: 'test'
        }).with({ test: 'i am from test3, want to update test1 s test key' });



    }

    strategy(name) {

        return {
            test: ({ val }) => {
                console.log(val);
                this.setState({ test: val });
            }
        }[name].bind(this);

    }


    init() {

        this.emit('onGet', '/components/TestSecond/state/:key', {
            key: 'test'
        }).with([this.strategy('test')]);


        this.state = {

        };
    }



};

export default self;
