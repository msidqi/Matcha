import React, { useEffect, useState } from 'react';
import axios from 'axios';
import conf from '../config/config';
import UserState from './UserState';
import { makeStyles, Grid, Avatar, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    position: 'sticky',
    top: '54px',
    float: 'right',
    textAlign:  'center',
    background: 'orange',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      minHeight: '100px',
      minWidth: '100%',
      // background: 'blue'
    },
    minHeight: '200px',
    // width: '200px',
    // overflow: 'auto',
    maxWidth: '200px',
    // minWidth: '150px',
  },
  wordBreak: theme.wordBreak,
  margincenter: theme.margincenter,
}));

export default function ProfileShort({uuid, ...rest}) {

  // const {uuid, connected,} = UserState();
  const classes = useStyles();

  const [dbuser, setDbuser] = useState({});

  useEffect( () => { 
    const CancelToken = axios.CancelToken;
    let cancel;
    (async function getUserData() {
      try {
        let res = await axios.get(`/api/${conf.apiVer}/users/${uuid}`, { cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }) });
        setDbuser(res.data);
        console.log(res.data);
      }
      catch (err) {
        console.log(err);
      }
    })();
    return (cancel);
  }, []);

  return (
    <div className={ `${classes.content} ${classes.wordBreak}` }>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Avatar className={classes.margincenter} id="Avatar" alt="Profile pic" src={(Object.keys(dbuser).length > 0 && dbuser.pictures[dbuser.picIndex]) ? `${conf.apiImages}/${dbuser.pictures[dbuser.picIndex]}` : "https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png"}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {dbuser.username}, {dbuser.age}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" />
                  <Typography color="textSecondary" variant="body2">
                    {dbuser.bio}
                  </Typography>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} >
                </Grid>
              </Grid>
            </div>
  );
}

