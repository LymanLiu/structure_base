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

        if(this.state.dialogTitle === '添加新闻') {

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
            
        } else if(this.state.dialogTitle === '公司简介') {
             this.setState({ sureBtnDisabled: true });
                 let content =  this.myEditor.getContent();
                this.emit('publishGet', '/components/MyEditor/:viewData', {
                    viewData: 'aboutCompany'
                }).with({
                    content
                });
        } else if(this.state.dialogTitle === '专线内容') {
             this.setState({ sureBtnDisabled: true });
                 let content =  this.myEditor.getContent();
                this.emit('publishGet', '/components/MyEditor/:viewData', {
                    viewData: 'russia'
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
            handleGet(data,rest) {

                if(rest.viewData === 'news') {
                    // console.log(data, rest, 11)
                    this.setState({
                        dialogShow: true,
                        dialogTitle: '添加新闻',
                        newsTitle: data.newsTitle,
                        newsContent: data.newsContent
                    });
                    
                } else if(rest.viewData == 'aboutCompany' ) {
                    this.setState({
                         dialogShow: true,
                         isShowTitle: false,
                         dialogTitle: '公司简介',
                         newsContent: data.content
                     });
                } else if(rest.viewData == 'russia' ) {
                    this.setState({
                         dialogShow: true,
                         isShowTitle: false,
                         dialogTitle: '专线内容',
                         newsContent: data.content
                     });
                }

                this.myEditor.setContent(this.state.newsContent);

            },
            dialogHidden(data,rest) {
                // console.log(data,rest, 22)
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
        }).with([(data,rest) => this.strategy('handleGet')(data,rest)]);

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
