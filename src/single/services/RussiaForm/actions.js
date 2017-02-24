import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents', //do not delete;
            'tab',
            'edit',
            'initData'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
