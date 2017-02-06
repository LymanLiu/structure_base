import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

//component
import Header from '../Header';
import NewsForm from '../NewsForm';
import Slider from '../../widgets/Slider';

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
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.removeEvents();
    }

    render() {
        return (
            <div className="app-root">
    			<Header />
                <div className="container-body">
                    <Slider 
                        onChange={(type, num) => this.actions.slider(type, num)}
                    />
                    <div className="content-box">
                       <NewsForm />
                    </div>
                </div>
    		</div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
