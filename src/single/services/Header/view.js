import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';

//component

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
        this.state = this.store.getState();
    }

    componentWillMount() {
     
        let title = ~window.location.href.indexOf('cn') ? '中' : '俄';
       this.title = `${title}文后台管理系统`;
       

    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }

    render() {
        let lang = !~location.href.indexOf('cn') ? 'cn' : 'en';
        let url = location.origin + `/981/${lang}/manager.html`;
        let urlName = lang !== 'cn' ? '俄语' : '中文';
        return (
            <div className="header-root header">
                <h2>{this.title}</h2>
               
                <div className="choose-lang">
                    <p className="sign-out" onClick={() => this.actions.signOut()}>退出</p>
                </div>
                 <div className="choose-lang">
                    <a href={url} > {urlName} </a>
                </div>
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
