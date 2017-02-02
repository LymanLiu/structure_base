import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'mount',
            'signOut'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
