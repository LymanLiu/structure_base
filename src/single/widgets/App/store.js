import Reflux from 'reflux';
import _ from 'underscore';

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
    onTest(text) {
        alert(text);
    }

    init() {}



};

export default self;
