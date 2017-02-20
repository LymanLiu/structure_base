import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents', //do not delete;
            'result',
            'dialogClose',
            'setVal'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
