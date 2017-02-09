import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

//component

export default class view extends React.Component {
    constructor(props, context) {
        super(props, context);

        //connect to reflux;
        this.styles = styles;
        this.actions = new Actions();
        this.store = new Store(this.actions);
        this.store.listen((data) => {
            if (this._isMounted) this.setState(data);
        });

        //init state
        this.state = this.store.getState();
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }

    render() {
        return (
            <div className="header-root header">
                <div className="choose-lang">
                    <p className="sign-out" onClick={() => this.actions.signOut()}>退出</p>
                </div>
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
