import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component

import MyEditor from '../../widgets/MyEditor';
import ReDialog from '../../widgets/ReDialog';
import ReTextField from '../../widgets/ReTextField';


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

    renderReDialogContent() {

        if (this.state.pending === 'add') {
            return this.renderAddContent();
        }
    }

    renderAddContent() {
        return (
            <div className="add-content">
                {this.state.isShowTitle ? <ReTextField 
                    className="edit-textfiled"
                    label="标题"
                    placeholder="请输入标题"
                    value={this.state.newsTitle}
                    onChange={(e)=>this.actions.setVal('newsTitle',e.target.value)}
                    errorText={this.state.titleErrorText}
                /> : null}
                 
                {this.state.isShowTitle ? <p className="mb10">新闻内容</p> : null}
                <MyEditor />
            </div>
        )
    }

    render() {

        return (
            <div className="orin-ss-myeditor-root" >
                 <ReDialog
                    title={ this.state.dialogTitle }
                    isShow={this.state.dialogShow}
                    dialogPending={this.state.dialogPending}
                    onCancel={() => this.actions.dialogClose()}
                    onConfirm={() => this.actions.result()}
                    sureBtnDisabled={this.state.sureBtnDisabled}
                    className='model-edit-dialog'
                > 
                    <div className="edit-container">
                        { this.renderAddContent() }
                    </div>
                </ReDialog>
            </div>
        );
    }
}
