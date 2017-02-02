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
    onSignOut() {
        console.log($$.getApi('signOut'))
        // browserHistory.push('/981/cn/manager.html/admin')
        // axios.post($$.getApi('signIn'), {username: 'admin', passcode: 'admin123'})
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => console.log(err))
    }

    init() {
        // console.log(browserHistory)
    }



};

export default self;
