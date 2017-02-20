import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'mount',
            'slider',
            'initData'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
