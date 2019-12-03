import React from 'react'
import Login from '../Views/Login';
import Register from '../Views/Register';
import Home from '../Views/Home';
import Users from '../Views/Users';
import Profile from '../Views/Profile';
import VerifiedPage from '../Views/VerifiedPage';
import ProfileSetup from '../Views/ProfileSetup';
import NavB from './navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link  
  } from 'react-router-dom';


export default function Routes() {
    return (
        <Router>
            <NavB />
            <Switch>
                <Route path="/users" exact component={Users} />
                <Route path="/users/:id" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/setup" exact component={ProfileSetup} />
                {/* <Route path="/profile" exact component={Profile} /> */}
                {/* <Route path="/profile/edit" component={Register} /> */}
                <Route path="/verification/:id/:token" exact component={VerifiedPage} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    )
}
