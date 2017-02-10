import Reflux from 'reflux';
import _ from 'underscore';
// import axios from 'axios';
import RootStore from '../../../core/Store.js';
import { browserHistory } from 'react-router';

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

    onResult(type) {

        $.post($$.getApi('insertOrder'), params, (res) => {
            console.log(res, 'iii')
        })
    }

    onSetVal(k, v) {
        this.setState({
            [k]: v
        })
    }

    onForbtn(pending) {
        this.setState({
            pending,
            dialogShow: true
        });

    }
    onSearch() {
        $.get($$.getApi('searchOrder'), { orderID }, (res) => {
            res = JSON.parse(res);
            console.log(res, 'search');
        }, (err) => {

        })
    }

    onDialogClose() {
        this.setState({ dialogShow: false });
    }

    init() {

        this.state = {
            dialogTitle: '添加订单信息',
            dialogShow: false,
            dialogPending: 'dialog',
            sureBtnDisabled: false,
            pending: 'add',
            orderID: '',
            orderIDErrorText: '',
            consignee: '',
            consigneeErrorText: '',
            address: '',
            addressErrorText: '',
            logisticsInfo: '',
            logisticsInfoErrorText: '',
            resList: ['orderID', 'consignee', 'address', 'logisticsInfo', 'inputTime']
        };
    }



};

export default self;
