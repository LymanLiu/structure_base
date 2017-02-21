import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents', //do not delete;
            'fixed',
            'del',
            'addPic'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
