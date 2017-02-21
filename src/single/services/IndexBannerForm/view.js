import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';
//differents parts;
import Store from './store.js';
import Actions from './actions.js';

//component
import ReButton from '../../widgets/ReButton';


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
        this.actions.initData();
    }

    componentWillUnmount() {
        this.actions.removeEvents(); //do not delete
        this._isMounted = false;
    }

    render() {

        return (
            <div className="orin-ss-indexbannerform-root" >
                <ul className="banner-list">
                    {this.state.bannerList.map( (item, i) => {
                        return (
                            <li key={'item' + i}>
                                <span className="num">{i + 1}</span>
                                <span className="name">{item.name}</span>
                                {/*<span className="fixe" onClick={() => this.actions.fixed(item.pic, item.id)}>
                                    修改
                                    <input type="file" className="input-file" />
                                </span>*/}
                                <span className="del" onClick={() => this.actions.del(item.pic, item.id)}>删除</span>
                            </li>
                        )
                    })}
                </ul>

                <button className="re-btn">
                    <input 
                        type="file"
                        className="input-file"
                        onChange={(e) => this.actions.addPic(e.target.files) }
                    />
                    添加
                </button>
                
            </div>
        );
    }
}
