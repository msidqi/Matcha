import React from 'react';
import Login from '../Views/Login';
import Register from '../Views/Register';
import Home from '../Views/Home';
import Users from '../Views/Users';
import Profile from '../Views/Profile';
import VerifiedPage from '../Views/VerifiedPage';
import ProfileSetup from '../Views/ProfileSetup';
import { useSelector } from 'react-redux';
import NavB from './navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
import AccountSetup from './AccountSetup'; 
import PrivateRoute from './PrivateRoute'; 
import GuestRoute from './GuestRoute'; 


export default function Routes() {
    return (
        <Router>
            <NavB />
            <AccountSetup />
            <Switch>
                <Route path="/users" exact component={Users} />
                <GuestRoute path="/users/:id" component={Profile} />
                <GuestRoute path="/login" component={Login} />
                <GuestRoute path="/register" component={Register} />
                <PrivateRoute path="/setup" component={ProfileSetup} />
                {/* <Route path="/profile" exact component={Profile} /> */}
                {/* <Route path="/profile/edit" component={Register} /> */}
                <Route path="/verification/:id/:token" exact component={VerifiedPage} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}
