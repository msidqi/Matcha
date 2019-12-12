import React, { useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { saveUser } from '../reduxx/actions/save';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import ls from 'local-storage';
import UserState from '../components/UserState';

const useStyles = makeStyles(theme => ({
  card: {
    paddingRight:    '0px',
    paddingLeft:    '0px',
    background: 'white',
    'border-radius': '5px',
    overflow: 'auto',
    'margin-top': '100px',
    'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  paddingLeftRight: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  banner: {
      background: '#ef4a25',
      height: '10px',
  },
}));
function Login() {

    const classes = useStyles();
    const init = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    const [Login, setLogin] = useState(init);

    const {connected, completed} = UserState();

    const dispatch = useDispatch();

    const handleEventChange = (event) => {
      setLogin({...Login, [event.target.name]:event.target.value});
    }

    const handleChange = (obj) => {
      setLogin({...Login, ...obj});
    }

    const sendData = async () => {
      try {
        let result = await axios.post(`/api/${conf.apiVer}/session/`, Login);
        console.log(result.data.completed);
        ls.set('connected', true);
        ls.set('uuid', result.data.uuid);
        ls.set('completed', result.data.completed);
        ls.set('verified', result.data.verified);
        ls.set('email', Login.email);
        ls.set('username', result.data.username);
        dispatch(saveUser({
                        uuid: result.data.uuid,
                        email: Login.email,
                        connected: true,
                        verified: result.data.verified,
                        completed: result.data.completed,
                        username: result.data.username}));
      }
      catch (e) {
        if (e.response && e.response.data.errors) {
          const errors = {
            emailError: e.response.data.errors.emailError,
            passwordError: e.response.data.errors.passwordError,
          };
          handleChange(errors);
        }
      }
    }

    const loginUser = async (event) => {
      event.preventDefault();
	    await sendData();
    }
    console.log(connected, completed);
    return (
      <Container className={ classes.card } maxWidth='sm'>
        {/* {((connected) && completed === true) && <Redirect to={'/'} />} */}
        <Grid item xs={12} className={classes.banner}>
        </Grid>
          <form  onSubmit={ loginUser } autoComplete="off" noValidate>
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info}`}>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'email' }
                      val={ Login.email }
                      func={ handleEventChange }
                      helperText={ Login.emailError }
                      type="email"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'password' }
                      val={ Login.password }
                      func={ handleEventChange }
                      helperText={ Login.passwordError }
                      type="password"
                      />
                  </Grid>
                  <Grid>
                    <Submit
                      val={ 'Login' }
                    />
                  </Grid>
            </Grid>
          </form>
      </Container>
    );
}

export default Login;