import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

// import SDRouter from './SDRouter.js';
import App from '../single/widgets/App';

var routes = {
    path: '/',
    component: App,
    childRoutes: []
};

export default () => <Router history={browserHistory} routes={routes} />
