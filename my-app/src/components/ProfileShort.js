import React from 'react';
import axios from 'axios';
import conf from '../config/config';
import UserState from './UserState';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'inline',
    width: '200px',
    height: '500px'
  },
}));

export default function ProfileShort(props) {

  const classes = useStyles();
  const {uuid, connected,} = UserState();
  (function getProfileData () {
      axios.get(`/api/${conf.apiVer}/users/${uuid}`);
  })();

  return (
    <div className={ classes.container }>

    </div>
  );
}

