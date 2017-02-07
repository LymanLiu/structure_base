import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component
import ReTable from '../../widgets/ReTable';
//
import Pagination from 'rc-pagination';


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

    render() {

        return (
            <div className="orin-ss-pagetable-root" >
                <ReTable 
                    tableDate={this.state.tableDate}
                />
                <div className="pagination-box">
                    <Pagination
                        onChange={(idx) => console.log(idx)}
                        current={this.state.currentPage} 
                        total={this.state.totalNumber}
                    />
                </div>
            </div>
        );
    }
}
