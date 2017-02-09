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

    onResult(res) {
        console.log(UM.getEditor('myEditor').getContent(), 'form')

        console.log(this.state.newsTitle, 't');

        if (this.state.newsTitle === '') {
            this.setState({ titleErrorText: '请输入标题' });
        } else {
            this.setState({ titleErrorText: '' });
            var params = {
                title: this.state.newsTitle,
                content: UM.getEditor('myEditor').getContent()
            }
            $.post($$.getApi('insertBusinessNews'), params, (res) => {
                console.log(res, 'iii')
            })
        }


        // axios.post($$.getApi('insertBusinessNews'), {title: 'news_test', content: 'xixixix'})
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => console.log(err))

        // console.log($$.getApi('insertBusinessNews'));
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
            pending: 'add'
        };
    }



};

export default self;
