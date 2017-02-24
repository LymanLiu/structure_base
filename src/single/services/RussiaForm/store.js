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
                    save: this.save,
                    getData: this.getData,
                    strategy: this.strategy

                })
                .value();
        }
    }

    onInitData(props) {
        let langPre = $$.lang === 'cn' ? '' : 'e';
        let pre = 'r';
        switch(props.type) {
            case 'russia':
                pre = 'r'; 
                break;
            case 'ua':
                pre = 'u'; 
                break;
            case 'whiteRussia':
                pre = 'w'; 
                break;
        }

        this.pre = `${langPre}${pre}_`;

        this.getData();
      
    }

    getData() {
      $$.utils.ajax('get')($$.getApi('russia'), { name: this.pre + this.state.type })
        .then(res => {
            var { list } = res;
            this.setState({
                content: list[0].content
            });

            
        })
        .catch(err => console.log(err, 'err'));
    }

    onTab(type) {
        this.setState({
            type
        });

        this.getData();

    }

    onEdit() {

        this.emit('get', '/components/MyEditor/:viewData', {
            viewData: 'russia'
        }).with({
            content: this.state.content
        });
    }

    save(data, rest) {
         // console.log(data, rest, 'rrr');
        var params = {
           content: data.content,
           name: this.pre + this.state.type
        }
        $$.utils.ajax('post')($$.getApi('russia'), params)
            .then(res => {
                // console.log(res, 'iii')
                if (res == 1) {
                    // if(this.state.addDataType === 'update') {

                    //     alert('修改成功')
                    // } else {
                        alert('修改成功');
                        this.setState({
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

    init() {
        this.emit('onGet', '/components/MyEditor/:viewData', {
            viewData: 'russia',
        }).with([(data, rest) => this.save(data,rest)]);

        this.state = {
            content: '正在加载。。。',
            type: 'air'
        };
    }



};

export default self;
