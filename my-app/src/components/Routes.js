import React from 'react';
import Login from '../Views/Login';
import Register from '../Views/Register';
import Home from '../Views/Home';
import Users from '../Views/Users';
import Profile from '../Views/Profile';
import VerifiedPage from '../Views/VerifiedPage';
import ProfileSetup from '../Views/ProfileSetup';
import NavB from './navbar';
import Footer from './Footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';
import AccountSetup from './AccountSetup'; 
import PrivateRoute from './PrivateRoute'; 
import GuestRoute from './GuestRoute'; 
import { makeStyles, Container, Grid } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    pageContainer: {
      position: 'relative',
      background: 'lightgreen',
      minHeight: '100vh',
    },
    body: {
        paddingBottom: '200px'
    }
  }));
export default function Routes() {

  const classes = useStyles();

  return (
    <Router>
        <div className={ classes.pageContainer }>
            <NavB />
            <AccountSetup />
            <div className={ classes.body }>
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
            </div>
            <Footer />
        </div>
    </Router>
    );
}
