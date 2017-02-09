import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'result',
            'dialogClose',
            'forbtn',
            'setVal'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
