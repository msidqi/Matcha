import React from 'react'
import Login from '../Views/Login';
import Register from '../Views/Register';
import Home from '../Views/Home';
import Users from '../Views/Users';
import Profile from '../Views/Profile';
import Nav from './navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link  
  } from 'react-router-dom';


export default function Routes() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/users" exact component={Users} />
                <Route path="/users/:id" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    )
}
