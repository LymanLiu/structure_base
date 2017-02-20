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
     static propTypes = {
        type: React.PropTypes.string.isRequired
    };

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

        this.thData = {
            en: ['title', 'content', 'time'],
            cn: ['标题', '文章内容', '发布时间']
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.actions.initData(this.props);
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }
 
    componentDidUpdate() {
    } 

   

    render() {
        return (
            <div className="news-form-root">
                <FourButton 
                    onAdd={() => this.actions.forbtn('add')}
                    isShowSearch={false}
                    onFixed={() => this.actions.forbtn('fixed')}
                    onDelete={() => this.actions.forbtn('delete')}
                />

               <PageTable 
                    api={$$.getApi('getNews')}
                    params={{type: this.props.type, pageSize: 10}}
                    thData={this.thData}
                    onRefresh={this.actions.refresh}
                    onEditor={(arg) => this.actions.editor(arg)}
                    onDelete={(arg) => this.actions.delete(arg)}
                    isShowDel={this.state.isShowDel}
                    isShowEidt={this.state.isShowEidt}
               />

               
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
