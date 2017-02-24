import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component
import ReButton from '../../widgets/ReButton';


export default class view extends React.Component {
    static propTypes = {
        type: React.PropTypes.string.isRequired,
    };

    static defaultProps = {
        type: 'russia'
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
        this.actions.initData(this.props);
    }

    componentWillUnmount() {
        this.actions.removeEvents(); //do not delete
        this._isMounted = false;
    }

    render() {

        return (
            <div className="orin-ss-russia-root" >
                <ul className="tabs">
                    <li onClick={() => this.actions.tab('air') } className={this.state.type === 'air' ? "tab cur" : "tab" }>空运</li>
                    <li onClick={() => this.actions.tab('land') } className={this.state.type === 'land' ? "tab cur" : "tab" }>陆运</li>
                    <li onClick={() => this.actions.tab('express') } className={this.state.type === 'express' ? "tab cur" : "tab" }>快递</li>
                </ul>
                <div className="btn-box">
                    <ReButton
                        label="编辑"
                        onClick={() => this.actions.edit()}
                    />
                </div>
                <div 
                    className="tab-content"
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                >
                </div>
            </div>
        );
    }
}
