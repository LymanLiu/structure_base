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
                    toogleBtn: this.toogleBtn,
                    strategy: this.strategy

                })
                .value();
        }
    }

    onResult(type) {
        // console.log(UE.getEditor('myEditor').getContent(), 'form')

        if (this.state.newsTitle === '') {
            this.setState({ titleErrorText: '请输入标题' });
        } else {
            this.setState({ titleErrorText: '', sureBtnDisabled: true });
            let content = UE.getEditor('myEditor').getContent().toString();
            var params = {
                title: this.state.newsTitle,
                content,
                type,
                update: this.state.isShowEidt,
                lang: $$.lang
            }
            if (this.state.isShowEidt) params.id = this.state.upadteId;

            $$.utils.ajax('post')($$.getApi('insertNews'), params)
            .then(res => {
                // console.log(res, 'iii')
                if(res == 1) {
                    if(this.state.isShowEidt) {

                        alert('修改成功')
                    } else {
                        alert('提交成功')
                        
                    }
                    this.resetState();
                    this.refresh();
                } else {
                    alert('服务器错误,请稍后在试')
                }
                
                this.setState({ sureBtnDisabled: false });
                
            }).catch(err => alert('服务器错误,请稍后在试'))
        }

    }

    resetState() {
        this.setState({
            sureBtnDisabled: false,
            dialogShow: false,
            newsTitle: '',
            titleErrorText: '',
            newsContent: '',
            isShowEidt: false
        });
         // UE.getEditor('myEditor').setContent('');
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
        if (pending === 'fixed' || pending === 'delete') {
            this.toogleBtn(pending);
        } else {
            this.setState({
                pending,
                dialogShow: true
            });
        }

    }

    toogleBtn(type) {
        // this.setState({[isShowDel]})
        switch (type) {
            case 'fixed':
                this.setState({ isShowEidt: !this.state.isShowEidt });
                break;
            case 'delete':
                this.setState({ isShowDel: !this.state.isShowDel });
                break;
        }
    }

    onEditor(pkg) {
        // console.log(pkg, 'edit')

        $$.utils.ajax('get')($$.getApi('getNews'), { id: pkg.id, type: pkg.type, lang: $$.lang })
            .then(res => {
                var { list } = res;
                this.setState({
                    newsTitle: list[0].title,
                    newsContent: list[0].content
                });
            })
            .catch(err => console.log(err, 'err'));

        this.setState({
            pending: 'add',
            dialogShow: true,
            upadteId: pkg.id
        });

    }
    onDelete(pkg) {
        // console.log(pkg, 'del')
        $$.utils.ajax('post')($$.getApi('deleteData'), { type: pkg.type, id: pkg.id, lang: $$.lang  })
            .then(res => {
                if (res === 1) {
                    this.refresh();
                    alert('删除成功');
                } else {
                    alert('删除失败，服务器错误');
                }
            })
            .catch(err => console.log(err, 'err'));
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
            newsContent: '',
            titleErrorText: '',
            pending: 'add',
            type: 'business',
            upadteId: 0,
            isShowEidt: false
        };
    }



};

export default self;
