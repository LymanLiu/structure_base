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

    onInitData() {
        $$.utils.ajax('get')($$.getApi('bannerImg'), { lang: $$.lang })
            .then(res => {
                var { list } = res;
                this.setState({
                    bannerList: list
                });

                // console.log(list)
                
            })
            .catch(err => console.log(err, 'err'));
    }

    onFixed(name) {
        console.log(name, 'fixed')
    }

    onDel(imagename, id) {
        // console.log(name, 'del')
        $$.utils.ajax('post')($$.getApi('uploadImg'), { lang: $$.lang ,act: 'delimg', imagename, id })
            .then(res => {

               if(res == 1) {
                    this.onInitData();
                    alert('删除成功');
                } else {
                    alert('服务器错误');
                }
                
            })
            .catch(err => console.log(err, 'err'));
    }

    onAddPic(files, name) {
        // console.log(files, 'files');

        if(files[0].size > 512000) { 
            alert('图片大小不能超过500k'); 
            return;      
        }
        name = name || 'index-banner' + this.state.bannerList.length;
        var formData = new FormData();
        formData.append('lang', $$.lang);
        formData.append('file', files[0]);

        $.ajax({
          url: $$.getApi('uploadImg'),
          type: "POST",
          processData: false,
          contentType: false,
          data: formData,
          success: (res) => {
            res = JSON.parse(res);
    //         console.log(res);
            if(res.isSuccess) {
                this.onInitData();
                alert('添加成功');
            } else {
                alert('服务器错误');
            }
          }
        });

    }

    init() {
        this.state = {
            bannerList: []
        };
    }



};

export default self;
