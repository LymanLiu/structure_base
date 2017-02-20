import Reflux from 'reflux';
import _ from 'underscore';
// import axios from 'axios';
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

    onResult() {

        if(this.state.isShowTitle) {

            if (this.state.newsTitle === '') {
                this.setState({ titleErrorText: '请输入标题' });
            } else {
                this.setState({ titleErrorText: '', sureBtnDisabled: true });
                 let content =  this.myEditor.getContent();
                this.emit('publishGet', '/components/MyEditor/:viewData', {
                    viewData: 'news'
                }).with({
                    newsTitle: this.state.newsTitle,
                    newsContent: content
                });


            }
            
        } else {
             this.setState({ sureBtnDisabled: true });
                 let content =  this.myEditor.getContent();
                this.emit('publishGet', '/components/MyEditor/:viewData', {
                    viewData: 'aboutCompany'
                }).with({
                    content
                });
        }

    }

    onDialogClose() {
        this.setState({ 
            dialogShow: false, 
            newsTitle: '', 
            newsContent: '', 
            sureBtnDisabled: false , 
            isShowTitle: true,
            dialogTitle: '添加新闻',
        });
         this.myEditor.setContent('');
    }

    strategy(name) {
        return {
            getNews(data,rest) {

                if(rest.viewData !== 'news') return;
                console.log(data, rest, 11)
                this.setState({
                    dialogShow: true,
                    newsTitle: data.newsTitle,
                    newsContent: data.newsContent
                });

                this.myEditor.setContent(data.newsContent);

            },
            getAboutCompany(data,rest) {
                 if(rest.viewData !== 'aboutCompany') return;
                 console.log(data, rest, 'aaa');
                 this.setState({
                     dialogShow: true,
                     isShowTitle: false,
                     dialogTitle: '公司简介',
                     newsContent: data.content
                 });
                 this.myEditor.setContent(data.content);
            },
            dialogHidden(data,rest) {
                console.log(data,rest, 22)
                this.onDialogClose();
            }
        }[name].bind(this);
    }

    onSetVal(k, v) {
        this.setState({
            [k]: v
        })
    }

    init() {

        this.emit('handleGet', '/components/MyEditor/:viewData', {
            viewData: 'news',
        }).with([(data,rest) => this.strategy('getNews')(data,rest)]);

        this.emit('handleGet', '/components/MyEditor/:viewData', {
            viewData: 'aboutCompany',
        }).with([(data,rest) => this.strategy('getAboutCompany')(data,rest)]);

        this.emit('handleUpd', '/components/MyEditor/:close', {
            close: 'close',
        }).with([(data,rest) => this.strategy('dialogHidden')(data,rest)]);


        this.myEditor = UE.getEditor('myEditor');

        this.state = {
            dialogTitle: '添加新闻',
            dialogShow: false,
            dialogPending: 'dialog',
            sureBtnDisabled: false,
            newsTitle: '',
            titleErrorText: '',
            newsContent: '',
            isShowTitle: true,

        };
    }



};

export default self;
