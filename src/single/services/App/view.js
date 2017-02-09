import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

//component
import Header from '../Header';
import OrderForm from '../OrderForm';
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
        this.state = this.store.getState();
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }

    renderComponent() {
        if(this.state.type === 'order') {
            return (<OrderForm />);
        } else if (this.state.type === 'business' || this.state.type === 'company') {
           return (<NewsForm type={this.state.type} />); 
        }
    }

    render() {
        return (
            <div className="app-root">
    			<Header />
                <div className="container-body">
                    <Slider 
                        onChange={(type, num, title) => this.actions.slider(type, num, title)}
                    />
                    <div className="content-box">
                        <h2>{this.state.title}</h2>
                        {this.renderComponent()} 
                    </div>
                </div>
    		</div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
