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

    onFixed(name) {
        console.log(name, 'fixed')
    }

    onDel(name) {
        console.log(name, 'del')
    }

    onAddPic(files, name) {
        console.log(files, 'files');

        if(files[0].size > 512000) { 
            alert('图片大小不能超过500k'); 
            return;      
        }
        name = name || 'index-banner' + this.state.bannerList.length;
        var formData = new FormData();
        formData.append('name', name);
        formData.append('file', files[0]);

        $.ajax({
          url: $$.getApi('uploadImg'),
          type: "POST",
          processData: false,
          contentType: false,
          data: formData,
          success: function(d) {
            console.log(d);
          }
        });
        
       // $$.utils.ajax('post')($$.getApi('uploadImg'), formData)
       //      .then(res =>  {
       //          console.log(res, 'ss')
       //      })
       //      .catch(err => console.log(err, 'err'));
    }

    init() {
        this.state = {
            bannerList: []
        };
    }



};

export default self;
