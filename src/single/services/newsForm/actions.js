import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'result'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
