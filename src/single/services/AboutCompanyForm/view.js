import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';


//component
import ReButton from '../../widgets/ReButton';
import MyEditor from '../../widgets/MyEditor';

export default class view extends React.Component {
    static propTypes = {};

    static defaultProps = {
        //name: 'component name'
    };
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
        this.state = this.store.getState();
    }

    componentDidMount() {
        this._isMounted = true;
        this.actions.initData();
    }

    componentDidUpdate() {
        // this.state.isEdit &&  UE.getEditor('myEditor').setContent(`${this.state.content}`);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }

    renderContent() {
        if(this.state.isEdit){

            return (
               <div className="ab-content-box" style={{display: this.state.isEdit ? 'block' : 'none'}} >
                    <MyEditor />
                    <div className="btn-box">
                        <ReButton 
                            label="取消" 
                            onClick={ () => this.actions.cancel() }  />
                        <ReButton 
                            label="保存" 
                            disabled={this.state.sureBtnDisabled} 
                            onClick={ () => this.actions.save() }  />
                    </div>
               </div>
            );
        } else {
            return (
                <div className="ab-content-box" >
                    <div className="btn-top"> <ReButton label="编辑"  onClick={ () => this.actions.editor() } /></div>
                    <div className="inner" dangerouslySetInnerHTML={{ __html: this.state.content }} ></div>
                </div>
            );
        }

    }
    render() {
        return (
            <div className="about-company-form-root">
                <div className="ab-content-box" style={{display: this.state.isEdit ? 'block' : 'none'}} >
                    <MyEditor id="abContent" />
                    <div className="btn-box">
                        <ReButton 
                            label="取消" 
                            onClick={ () => this.actions.cancel() }  />
                        <ReButton 
                            label="保存" 
                            disabled={this.state.sureBtnDisabled} 
                            onClick={ () => this.actions.save() }  />
                    </div>
               </div>
                <div className="ab-content-box"  style={{display: !this.state.isEdit ? 'block' : 'none'}} >
                    <div className="btn-top"> <ReButton label="编辑"  onClick={ () => this.actions.editor() } /></div>
                    <div className="inner" dangerouslySetInnerHTML={{ __html: this.state.content }} ></div>
                </div>
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
