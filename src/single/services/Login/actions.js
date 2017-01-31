import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'mount',
            'signIn'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
