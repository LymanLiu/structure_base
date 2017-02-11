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
                    resetState: this.resetState,
                    strategy: this.strategy

                })
                .value();
        }
    }

    onResult(type) {
        // console.log(UM.getEditor('myEditor').getContent(), 'form')

        if (this.state.newsTitle === '') {
            this.setState({ titleErrorText: '请输入标题' });
        } else {
            this.setState({ titleErrorText: '', sureBtnDisabled: true });
            let content = UM.getEditor('myEditor').getContent().toString();
            var params = {
                title: this.state.newsTitle,
                content,
                type
            }

            $$.utils.ajax('post')($$.getApi('insertNews'), params)
            .then(res => {
                // console.log(res, 'iii')
                if(res == 1) {
                    alert('提交成功')
                } else {
                    alert('服务器错误,请稍后在试')
                }
                
                this.resetState();
                this.refresh();
            }).catch(err => alert('服务器错误,请稍后在试'))
        }

    }

    resetState() {
        this.setState({
            sureBtnDisabled: false,
            dialogShow: false,
            newsTitle: '',
            titleErrorText: ''
        });
         UM.getEditor('myEditor').setContent('');
    }

    onRefresh(fn) {
        if(fn) this.refresh = fn;
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

    onDialogClose() {
        this.setState({ dialogShow: false });
    }

    init() {

        this.state = {
            dialogTitle: '添加新闻',
            dialogShow: false,
            dialogPending: 'dialog',
            sureBtnDisabled: false,
            newsTitle: '',
            titleErrorText: '',
            pending: 'add',
            type: 'business'
        };
    }



};

export default self;
