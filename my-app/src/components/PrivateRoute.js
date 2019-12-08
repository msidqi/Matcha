import React from 'react';
import { Route } from 'react-router-dom';
import UserState from './UserState';
import Login from '../Views/Login';


export default function PrivateRoute({ component: Component, path: Path, exact: Exact, ...rest }) {
    const { connected } = UserState();
    return (
        <>
            { connected ? <Route path={Path} exact={Exact} component={Component} /> : <Route path="/login" component={Login} /> }
        </>
    );
};
