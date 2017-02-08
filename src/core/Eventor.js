class Observer {

    constructor() {
        this.register = {};
    }
    getFuncs(eventName) {
        if (this.register[eventName]) {
            return [...this.register[eventName]];
        } else {
            console.warn(`eventor have no listeners to <${eventName}>`);
            return [];
        }
    }
    fire(eventName, ...params) {
        if (this.register[eventName]) {
            let eventFuncsArr = [...this.register[eventName]];
            return eventFuncsArr.map(f => f(...params));
        } else {
            console.warn(`eventor have no listeners to <${eventName}>`);
            return [];
        }
    }

    off(eventName, listeners) {

        if (this.register[eventName]) {
            if (listeners) {
                listeners.forEach((v) => {
                    let index = this.register[eventName].indexOf(v);
                    if (~index) {
                        this.register[eventName].splice(index, 1);
                    }
                })
            } else {
                delete this.register[eventName];
            }
        } else {
            console.warn(`eventor have no listeners to <${eventName}>`);
        }
    }

    on(eventName, listeners) {

        if (!this.register[eventName] || Object.prototype.toString.call(this.register[eventName]) !== '[object Array]') {
            this.register[eventName] = [];
        }

        this.register[eventName] = this.register[eventName].concat(...listeners);

        return eventName;
    }
}
class Eventor {

    constructor() {

        this.observer = new Observer();

    }

    _getEventName({ method, restfulEvent, restParams }) {
        let eventName = method.toUpperCase() + '|' + restfulEvent.split('/').map(v => {
            if (~v.indexOf(':')) {

                let key = v.substr(1);

                if (!restParams[key]) {
                    throw new Error(method + ' restful event <' + restfulEvent + '> need param: <' + key + '>');
                }

                return restParams[key];
            } else {
                return v;
            }

        }).join('/');

        return eventName;

    }

    _handleRequest({ method, restfulEvent, handles }) {

        if (Object.prototype.toString.call(handles) !== '[object Array]') {
            handles = [handles];
        }

        let rawEvent = method.toUpperCase() + '|' + restfulEvent;

        return this.observer.on(rawEvent, handles);
    }

    _publishRequest({ method, restfulEvent, restParams }) {

        let eventName = this._getEventName({ method, restfulEvent, restParams });
        return (data) => {
            this.observer.fire(eventName, data);
        };


    }

    _request({ method, restfulEvent, restParams }) {
        let rawEvent = method.toUpperCase() + '|' + restfulEvent;
        //let arrFuns = [...this.observer.getFuncs(rawEvent)];

        return (data) => {
            this.observer.fire(rawEvent, data, restParams);
        };
    }

    _onRequest({ method, restfulEvent, restParams, funcs }) {

        let eventName = this._getEventName({ method, restfulEvent, restParams });

        return this.observer.on(eventName, funcs);
    }


    off(eventName, listeners) {
        this.observer.off(eventName, listeners);
    }


    get(restfulEvent, restParams) {
        let request = this._request({ method: 'GET', restfulEvent, restParams });
        return (data) => {
            request(data);
        };
    }

    add(restfulEvent, restParams) {
        let request = this._request({ method: 'ADD', restfulEvent, restParams });
        return (data) => {
            request(data);
        };
    }

    upd(restfulEvent, restParams) {
        let request = this._request({ method: 'UPD', restfulEvent, restParams });
        return (data) => {
            request(data);
        };
    }

    del(restfulEvent, restParams) {
        let request = this._request({ method: 'DEL', restfulEvent, restParams });
        return (data) => {
            request(data);
        };
    }


    handleGet(restfulEvent) {
        return (handles) => {
            return this._handleRequest({ method: 'GET', restfulEvent, handles });
        }
    }

    handleAdd(restfulEvent) {
        return (handles) => {
            return this._handleRequest({ method: 'ADD', restfulEvent, handles });
        }
    }

    handleUpd(restfulEvent) {
        return (handles) => {
            return this._handleRequest({ method: 'UPD', restfulEvent, handles });
        }
    }

    handleDel(restfulEvent) {
        return (handles) => {
            return this._handleRequest({ method: 'DEL', restfulEvent, handles });
        }

    }



    publishGet(restfulEvent, restParams) {
        let publish = this._publishRequest({ method: 'RES_GET', restfulEvent, restParams });
        return (data) => {
            publish(data);
        };
    }

    publishAdd(restfulEvent, restParams) {

        let publish = this._publishRequest({ method: 'RES_ADD', restfulEvent, restParams });
        return (data) => {
            publish(data);
        };
    }

    publishUpd(restfulEvent, restParams) {

        let publish = this._publishRequest({ method: 'RES_UPD', restfulEvent, restParams });
        return (data) => {
            publish(data);
        };
    }

    publishDel(restfulEvent, restParams) {

        let publish = this._publishRequest({ method: 'RES_DEL', restfulEvent, restParams });
        return (data) => {
            publish(data);
        };
    }



    onGet(restfulEvent, restParams) {
        return (funcs) => {
            return this._onRequest({ method: 'RES_GET', restfulEvent, restParams, funcs });
        };
    }

    onAdd(restfulEvent, restParams) {
        return (funcs) => {
            return this._onRequest({ method: 'RES_ADD', restfulEvent, restParams, funcs });
        };
    }

    onUpd(restfulEvent, restParams) {
        return (funcs) => {
            return this._onRequest({ method: 'RES_UPD', restfulEvent, restParams, funcs });
        };
    }

    onDel(restfulEvent, restParams) {
        return (funcs) => {
            return this._onRequest({ method: 'RES_DEL', restfulEvent, restParams, funcs });
        };
    }


}

export default Eventor;
