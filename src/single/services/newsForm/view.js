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
import FourButton from '../../widgets/FourButton';
import MyEditor from '../../widgets/MyEditor';
import ReDialog from '../../widgets/ReDialog';
import PageTable from '../PageTable';

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
        this.state = this.state.getSate();
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
            <div className="news-form-root">
                <FourButton 
                    onAdd={() => console.log('add')}
                    isShowSearch={false}
                    onFixed={() => console.log('Fixed')}
                    onDelete={() => console.log('Delete')}
                />

               <PageTable />
                <MyEditor />
                <ReButton
                    className="news-btn"
                    label='提交'
                    onClick={(res) => this.actions.result(res)}
                />

                <ReDialog
                    title={ this.state.dialogTitle }
                    isShow={this.state.dialogShow}
                    dialogPending={this.state.dialogPending}
                    onCancel={() => this.actions.dialogClose()}
                    sureBtnDisabled={this.state.sureBtnDisabled}
                    className='model-edit-dialog'
                > 
                    { this.renderReDialogContent() }
                </ReDialog>
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
