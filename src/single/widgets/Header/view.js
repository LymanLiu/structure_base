import React from 'react';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

export default class view extends React.Component {
    constructor(props, context) {
        super(props, context);
        //init state
        this.state = {

        }
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="header-root header">
    			<div className="choose-lang">
                    <p id="signOut">退出</p>
                </div>
    		</div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
