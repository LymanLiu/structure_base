import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

// import SDRouter from './SDRouter.js';
import App from '../single/services/App';
import Login from '../single/services/Login';

const pathRoot = ~location.href.indexOf('cn') ? '981/cn/manager.html' : '981/en/manager.html';

var routes = {
    path: `${pathRoot}`,
    component: Login,
    childRoutes: [
    	
    ]
};

export default () => <Router history={browserHistory} routes={routes} />
