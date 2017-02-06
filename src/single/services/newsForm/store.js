import Reflux from 'reflux';
import axios from 'axios';
import _ from 'underscore';
import { browserHistory } from 'react-router';

const self = class store {
    constructor(actions, type) {

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
                    onRemoveEvents: this.onRemoveEvents,
                    omitAutoRemoveEvents: this.omitAutoRemoveEvents,
                    eventLoger: this.eventLoger,
                    removeListenersToCommunicationEvents: this.removeListenersToCommunicationEvents,
                    listenEvents: this.listenEvents,
                    init: this.init
                })
                .value();
        }
    }
    onResult(res) {
        // console.log(res, 'form')
        // browserHistory.push('/981/cn/manager.html/admin')
        axios.post($$.getApi('insertBusinessNews'), {title: 'news_test', content: 'xixixix'})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))

        console.log($$.getApi('insertBusinessNews'));
    }

    init() {
        // console.log(browserHistory)
        
    }



};

export default self;
