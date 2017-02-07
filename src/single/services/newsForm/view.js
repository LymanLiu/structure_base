import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//
import Pagination from 'rc-pagination';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';


//component
import ReButton from '../../widgets/ReButton';
import ReTextField from '../../widgets/ReTextField';
import FourButton from '../../widgets/FourButton';
import MyEditor from '../../widgets/MyEditor';
// import Pagination from '../Pagination';

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
            totalNumber: 25,
            pageSize: 10,
            currentPage: 10
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
            <div className="news-form-root">
                <FourButton 
                    onAdd={() => console.log('add')}
                    onSearch={() => console.log('Search')}
                    onFixed={() => console.log('Fixed')}
                    onDelete={() => console.log('Delete')}
                />
                 <Pagination
                    onChange={(idx) => console.log(idx)}
                    current={this.state.currentPage} 
                    total={this.state.totalNumber}
                />
                <MyEditor />
                <ReButton
                    className="news-btn"
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
