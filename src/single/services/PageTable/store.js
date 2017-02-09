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
                    strategy: this.strategy,
                    getData: this.getData

                })
                .value();
        }
    }

    onInitData(props) {
        this.api = props.api
        this.thData = props.thData.en
        this.getData();
    }

    onPagination(currentPage) {
        this.setState({
            currentPage
        });
        this.getData();

    }

    getData() {
        // axios.get(this.api, { page })
        //     .then(res => {
        //         console.log(res, 1)
        //     }).catch(err => {
        //         console.log(err, 'err')
        //     })

        $.get(this.api, { page: this.state.currentPage, }, (res) => {
            res = JSON.parse(res);

            var { total, list } = res;
            var tdData = [];
            list.forEach(obj => {
                var _td = [];
                this.thData.forEach(k => {
                    _td.push(obj[k]);
                });
                tdData.push(_td);
            });

            this.setState({
                total,
                tdData
            });
        })
    }

    init() {



        this.state = {
            total: 1,
            pageSize: 1,
            currentPage: 1,
            tdData: [
                []
            ]
        };
    }



};

export default self;
