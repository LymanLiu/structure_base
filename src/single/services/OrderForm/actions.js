import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'result',
            'dialogClose',
            'forbtn',
            'setVal',
            'search',
            'focus',
            'refresh'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
