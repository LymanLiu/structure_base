import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component



export default class view extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
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
        this.state = {
            test: ''
        };
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.actions.removeEvents();
        this._isMounted = false;
    }

    render() {

        return (
            <div className="orin-ss-test-root" >
                <div>success build the component : Test</div>
                <button onTouchTap = {()=>this.actions.test('success')} >Test</button>
                <div>testState : {this.state.test}</div>
                <div>children : </div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
