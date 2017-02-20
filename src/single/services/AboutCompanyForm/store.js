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

    onSave(data, rest) {

        console.log(data, rest, 'ccc');
            var params = {
               content: data.content,
               lang: $$.lang,
               type: 'update'
            }
            $$.utils.ajax('post')($$.getApi('aboutCompany'), params)
                .then(res => {
                    // console.log(res, 'iii')
                    if (res == 1) {
                        // if(this.state.addDataType === 'update') {

                        //     alert('修改成功')
                        // } else {
                            alert('修改成功');
                            this.setState({
                                isEdit: false,
                                content: data.content
                            });

                            this.emit('upd', '/components/MyEditor/:close', {
                                close: 'close'
                            }).with({
                                dialogShow: false
                            });
                            
                        // }
                    } else {
                        alert('服务器错误,请稍后在试')
                    }
                }).catch(err => console.log(err))

    }

    onInitData() {
        $$.utils.ajax('get')($$.getApi('aboutCompany'), { lang: $$.lang })
            .then(res => {
                var { list } = res;
                this.setState({
                    content: list[0].content
                });

                
            })
            .catch(err => console.log(err, 'err'));
    }

   
    onEditor(pkg) {
        // console.log(pkg, 'edit')
        
        this.setState({
            isEdit: true
        });

        this.emit('get', '/components/MyEditor/:viewData', {
            viewData: 'aboutCompany'
        }).with({
            content: this.state.content
        });
       

    }

    onCancel() {
          this.setState({
            isEdit: false
        });
    }


    init() {

        this.emit('onGet', '/components/MyEditor/:viewData', {
            viewData: 'aboutCompany',
        }).with([(data, rest) => this.onSave(data,rest)]);

        this.state = {
          isEdit: false,
          content: '',
          sureBtnDisabled: false
        };
    }



};

export default self;
