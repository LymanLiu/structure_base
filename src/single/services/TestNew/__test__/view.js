import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component
import TestNew from '../index';


export default class view extends React.Component {
    static propTypes = {
    };


    constructor(props, context) {

        super(props, context);

        //connect to reflux;
        this.actions = new Actions();
        this.store = new Store(this.actions);
        this.store.listen((data) => {
            if (this._isMounted) {

                this.setState(data);
            }
        });

        // init state;
        this.state = this.store.getState();
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.actions.removeEvents(); //do not delete
        this._isMounted = false;
    }

    render() {

        return (
            <div className="orin-ss-testnew-root-test" >
                <TestNew/>
            </div>
        );
    }
}