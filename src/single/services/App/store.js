import Reflux from 'reflux';
import _ from 'underscore';
import axios from 'axios';
import { browserHistory } from 'react-router';
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


    init() {

        this.state = {
            
        };
    }



};

export default self;
