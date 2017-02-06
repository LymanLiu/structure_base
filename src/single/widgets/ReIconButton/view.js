import React from 'react';

//react-router;
import { Link } from 'react-router';

//component
import ReIcon from '../ReIcon';


export default class view extends React.Component {
    static propTypes = {
        icon: React.PropTypes.string,
        tooltip: React.PropTypes.any,
        isMask: React.PropTypes.bool,
    };

    constructor(props, context) {

        super(props, context);


        // init state;
        this.state = {

        };
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let className = this.props.className ? 'orin-sw-reiconbutton-root ' + this.props.className : 'orin-sw-reiconbutton-root ';
        className = this.props.isMask ? className + ' mask' : className;
        let _props = {...this.props };
        delete _props.isMask;
        delete _props.icon;
        delete _props.tooltip;
        delete _props.className;
        return (
            <button
                {..._props}
                className={ className } 
            >
                <ReIcon className="icon-box" icon={this.props.icon} />
                {this.props.tooltip ? <span className="tooltip-box top">{this.props.tooltip}</span> : null}
            </button>
        );
    }
}
