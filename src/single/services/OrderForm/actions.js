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
            'refresh',
            'editor',
            'delete',

        ];
        return Reflux.createActions(actions);
    }
};

export default self;
