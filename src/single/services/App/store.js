import Reflux from 'reflux';
import _ from 'underscore';
// import axios from 'axios';
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
                    strategy: this.strategy,
                    updatePageTabel: this.updatePageTabel

                })
                .value();
        }
    }

    onSlider(type, idx, title) {

        this.setState({ type, title });

        location.hash = type;
    }

    // onInitData() {
    //     let type = location.hash.replace('#', '');
    //     this.setState({
    //         type
    //     });
    // }

    init() {

        this.state = {
            title: '订单',
            type: 'order'
        };
    }



};

export default self;
