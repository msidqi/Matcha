import React, { useEffect, useState } from 'react';
import axios from 'axios';
import conf from '../config/config';
import UserCard from './UserCard';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    content: {
        float: 'right',
        textAlign:  'center',
        background: 'green',
        [theme.breakpoints.down('sm')]: {
            minHeight: '100px',
            maxWidth: '100%',
        },
        width: '100%',
        // height: '100%',
        // width: '200px',
        // overflow: 'auto',
        // maxWidth: '200px',
        // minWidth: '150px',
    },
    cardContainer: {
        textAlign: 'left',
        marginTop: '20px'
        // justifyContent: 'center',
        // 'align-items': 'center',
        // background: 'white',
        // height: '300px',
        // width: '100px',
    },
    margincenter: theme.margincenter,
}));

export default function Matches({uuid, ...rest}) {

  // const {uuid, connected,} = UserState();
  const classes = useStyles();

  const [fetchedUsers, setFetchedUsers] = useState([]);

  useEffect( () => { 
    const CancelToken = axios.CancelToken;
    let cancel;
    const fetchUsers = async () => {
      try {
        let res = await axios.get(`/api/${conf.apiVer}/users/suggestions/`, { cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }) });
        setFetchedUsers(res.data);
        console.log(res.data);
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchUsers();
    return (cancel);
  }, []);

  return (
    <div className={ classes.content }>
        <Grid container
        spacing={2}
        justify="center"
        alignItems="flex-start"
        >
            {fetchedUsers.map((user, index) => {

                return (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={`${index}-${user.username}`} className={ classes.cardContainer }>
                        <UserCard user={user} style={{margin: '500px'}}/>
                    </Grid>
                )
            })}
        </Grid>
    </div>
  );
}

