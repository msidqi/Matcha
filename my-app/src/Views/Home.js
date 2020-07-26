import React from 'react';
import ProfileShort from '../components/ProfileShort';
import Matches from '../components/Matches';
import { makeStyles, Container, Grid } from '@material-ui/core';
import UserState from '../components/UserState';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    background: 'yellow',
    // width: '100%',
    // height: '100vh',
    // display: 'inline',
    // overflow: 'auto',
    // height: '100vw'
  },
  leftcontainer: {
    // float: 'left',
    // overflow: 'auto',
    minHeight: '100vh',
    background: 'red',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100px',
      maxWidth: '100%',
    },
    // display: 'inline-block',
    // width: 200,
    // height: 200,
    // height: '100%'
  },
  rightcontainer: {
    // float: 'left',
    minHeight: '100vh',
    background: 'blue',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100px',
      maxWidth: '100%',
    },
      // display: 'inline-block',
    // display: 'inline',
    // width: '50%',
    // height: '100px'
  },
  margincenter: theme.margincenter,
}));

function Home() {
  const user = UserState();
  const classes = useStyles();
  return (
    <>
      {user.connected && user.verified && !user.completed && <Redirect to="/setup"/>}
      {/* {user.connected && user.verified && user.completed && <Redirect to="/login"/>} */}
      <Container className={ classes.container }  maxWidth='xl'>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} className={ classes.leftcontainer }>
            <ProfileShort {...user}/>
          </Grid>
          <Grid item xs={12} md={9} className={ classes.rightcontainer }>
              <Matches {...user}/>
          </Grid>
        </Grid>
      </Container>
    </>
    );
}

export default Home;
