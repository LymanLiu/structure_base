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
        //alert(text);
        this.setState({
            test: 'run a reflux workflow'
        });
    }

    init() {
        let i = 0;
        this.emit('handleGet', '/components/TestSecond/state/:key')
            .with((data, restParams) => {
                console.log(restParams)
                console.log(data);
                let test = '';
                if (restParams.key == 'test') {
                    test = this.state.test;
                } else if (restParams.key == 'test3') {
                    test = this.state.test3;
                }

                this.emit('publishGet', '/components/TestSecond/state/:key', restParams).with({ val: test, i });
                i++;
            });

        this.emit('handleUpd', '/components/TestSecond/state/:key')
            .with((data, restParams) => {
                console.log(restParams)
                console.log(data);
                let test = '';
                if (restParams.key == 'test') {
                    test = i + '<' + data.test + '> | ' + 'you have success update fisrt test key it!!';
                }

                this.setState({
                    test
                });

                this.emit('publishUpd', '/components/TestSecond/state/:key', restParams).with({ val: test });
                i++;
            });


        this.state = {
            test: 'first test value',
            test3: 'first test3 value'
        };
    }



};

export default self;
