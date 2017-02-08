import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component
import ReDialog from '../../widgets/ReDialog';


export default class view extends React.Component {
    static propTypes = {
        //name: React.PropTypes.string,
    };

    static defaultProps = {
        //name: 'component name'
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

    }

    componentWillUnmount() {
        this.actions.removeEvents(); //do not delete
        this._isMounted = false;
    }

    //logic
    renderReDialogContent() {

    }

    //view
    renderTypeOfAdd() {

    }

//    <ReDialog
//     title={ this.state.dialogTitle }
//     isShow={this.state.dialogShow}
//     dialogPending={this.state.dialogPending}
//     onCancel={() => this.actions.dialogClose()} 
//     onConfirm={() => this.actions.confirm()}
//     sureBtnDisabled={this.state.sureBtnDisabled}
//     className='model-edit-dialog'
// > 
//     { this.renderReDialogContent() }
// </ReDialog>
    render() {

        return (
            <div className="orin-ss-dialog-root" >
            </div>
        );
    }
}
