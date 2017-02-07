import React from 'react';

//react-router;
import { Link } from 'react-router';

//component



export default class view extends React.Component {
    static propTypes = {
        //name: React.PropTypes.string,
    };

    static defaultProps = {
        //name: 'component name'
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

        return (
            <div className="orin-sw-dome-root" >
                <div>success build the component : Dome</div>
                <button onTouchTap = {()=>alert('success')} >Dome</button>
                <div>children : </div>
                <div>{this.props.children}</div>

            </div>
        );
    }
}
