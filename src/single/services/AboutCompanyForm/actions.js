import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'initData',
            'editor',
            'cancel',
            'save'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
