import React from 'react';

//react-router;
import { Link } from 'react-router';

//component

import iconfont from 'libs/font/iconfont.js';


export default class view extends React.Component {
    static propTypes = {
        icon: React.PropTypes.string.isRequired,
    };

    //icon 参考 libs/font/demo_symbol.html

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
        var useTag = `<use xlink:href=#icon-${this.props.icon}></use>`;

        return (
            <svg
                aria-hidden="true"
                className={this.props.className ? "orin-sw-reicon-root " + this.props.className : "orin-sw-reicon-root"}
                dangerouslySetInnerHTML={{ __html: useTag }}
            />
        );
    }
}
