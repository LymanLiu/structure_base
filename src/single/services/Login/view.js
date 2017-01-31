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
        this.state = {

        }
    }

    componentDidMount() {
        this._isMounted = true;
        document.onkeyup = (e) => {
            if(e.keyCode === 13) this.actions.signIn();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.removeEvents();
    }

    render() {
        return (
            <div className="login-root">
    			<button 
                    onClick={() => this.actions.signIn()}>
                    登录
                </button>
    		</div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
