import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';



//component
import ReButton from '../../widgets/ReButton';
import ReTextField from '../../widgets/ReTextField';
import MyEditor from '../../widgets/MyEditor';

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
            <div className="post-form-root">
                <MyEditor 
                    onChange={(editorState) => {console.log(editorState)}}
                />
                <ReButton
                    label='提交'
                    onClick={(res) => this.actions.result(res)}
                />
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
