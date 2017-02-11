import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'result',
            'dialogClose',
            'forbtn',
            'setVal',
            'refresh'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
