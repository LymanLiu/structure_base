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
        api: React.PropTypes.string.isRequired,
        thData: React.PropTypes.object.isRequired,
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
        this.actions.initData(this.props);
    }

    componentWillUnmount() {
        this.actions.removeEvents(); //do not delete
        this._isMounted = false;
    }

    render() {

        return (
            <div className="orin-ss-pagetable-root" >
                <ReTable 
                    thData={this.props.thData.en}
                    tdData={this.state.tdData}
                />
                <div className="pagination-box">
                    <Pagination
                        onChange={(idx) => this.actions.pagination(idx)}
                        current={this.state.currentPage} 
                        total={this.state.total}
                    />
                </div>
            </div>
        );
    }
}
