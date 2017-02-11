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
                    strategy: this.strategy,
                    checkMesg: this.checkMesg,
                    checkAllMesg: this.checkAllMesg,
                    resetState: this.resetState,

                })
                .value();
        }
    }

    onResult() {
         if (this.checkAllMesg()) {

            this.setState({ sureBtnDisabled: true });
            var params = {
                orderID: this.state.orderID,
                consignee: this.state.consignee,
                address: this.state.address,
                logisticsInfo: this.state.logisticsInfo,
            }
            $$.utils.ajax('post')($$.getApi('insertOrder'), params)
            .then(res => {
                console.log(res, 'iii')
                if(res == 1) {
                    alert('提交成功')
                } else {
                    alert('服务器错误,请稍后在试')
                }
                this.resetState();
                this.refresh();
            }).catch(err => console.log(err))
        } else {
            this.setState({ sureBtnDisabled: false });
        }
    
    }

    resetState() {
        this.setState({
            orderID: '',
            consignee: '',
            address: '',
            logisticsInfo: '',
            dialogShow: false
        });
    }

    onRefresh(fn) {
        if(fn) this.refresh = fn;
    }  

    checkAllMesg() {
        let bool = (this.checkMesg(this.state.orderID,'orderID','请输入订单号') && this.checkMesg(this.state.consignee,'consignee','请输入收件人') && this.checkMesg(this.state.address,'address','请输入收件人地址') && this.checkMesg(this.state.logisticsInfo,'logisticsInfo','请输入物流信息')) ? true : false;

        return bool
    }

    checkMesg(str,type,err) {
        if(str === '') {
            this.setState({[type +'ErrorText']: err})
            return false
        } else {
            this.setState({[type +'ErrorText']: ''})
            return true
        }
    }

    onSetVal(k, v) {
        this.setState({
            [k]: v
        })
    }

    onFocus(type) {
        this.setState({[type+'ErrorText'] : ''})
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