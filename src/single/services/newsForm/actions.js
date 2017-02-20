import Reflux from 'reflux';

const self = class Actions {
    constructor() {
        var actions = [
            'removeEvents',
            'initData',
            'dialogClose',
            'forbtn',
            'setVal',
            'refresh',
            'editor',
            'delete'
        ];
        return Reflux.createActions(actions);
    }
};

export default self;
