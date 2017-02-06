import React from 'react';
//react-router;
import { Link } from 'react-router';

//differents parts;


//component



export default class view extends React.Component {
    static propTypes = {
        label: React.PropTypes.string,
        lablePosition: React.PropTypes.string,
        icon: React.PropTypes.element,
    };

    static defaultProps = {
        label: 'default'
    }

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
        // this.actions.removeEvents();
        this._isMounted = false;
    }

    renderIcon(className) {
        // console.log(this.props.icon, 123)
        return (
            <span key={(this.props.label || 'default') + 'icon'} className={className} >{this.props.icon}</span>
        );

    }
    renderLabel() {
        if (this.props.lablePosition == 'before') {
            return [
                <span key={(this.props.label || 'default') + 'key'} className="label-before">{this.props.label}</span>,
                this.props.icon ? this.renderIcon('icon-before') : null
            ];
        } else {
            return [
                this.props.icon ? this.renderIcon('icon') : null,
                <span key={(this.props.label || 'default') + 'key'} className="label">{this.props.label}</span>
            ];
        }
    }

    render() {
        let _props = {...this.props };
        _props.label && delete _props.label;
        _props.className && delete _props.className;
        _props.icon && delete _props.icon;
        return (
            <button
                {..._props} 
                className = {this.props.className ? 'ori-button-root ' + this.props.className : 'ori-button-root'}
            >  

                {this.renderLabel()}
                {this.props.children ? this.props.children : null}
            </button>
        );
    }
}
