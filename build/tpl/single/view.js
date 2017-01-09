import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

//meterial
import { cyan500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

//component



export default class view extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };


    constructor(props, context) {

        super(props, context);

        //connect to reflux;
        this.styles = styles;
        this.actions = new Actions();
        this.store = new Store(this.actions);
        this.store.listen((data) => {
            if (this._isMounted) {

                this.setState(data);
            }
        });

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
        this.actions.removeEvents();
        this._isMounted = false;
    }

    render() {

        return (
            <div className="<?= ori.className ?>" style = {this.styles.test} >
                <div>success build the component : <?= ori.componentName  ?></div>
                <RaisedButton
                    label = "<?= ori.componentName ?>"
                    secondary = {true}
                    onTouchTap = {()=>this.actions.test('run a reflux workflow')} />
                <div>children : </div>
                <div>{this.props.children}</div>

            </div>
        );
    }
}
