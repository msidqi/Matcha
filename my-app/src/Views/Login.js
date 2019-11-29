import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../reduxx/actions/save';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';

function Login() {

  // localStorage.getItem()
  // localStorage.removeItem()
  // localStorage.setItem();


    // connection state

    const init = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    const [Login, setLogin] = useState(init);
    const [toNext, settoNext] = useState(false);
    const connected = ls.get('connected');
    var con = useSelector(state => state.Connection);
    
    const dispatch = useDispatch();

    const handleEventChange = (event, obj = null) => {
      setLogin({...Login, [event.target.name]:event.target.value});
    }

    const handleChange = (obj) => {
      setLogin({...Login, ...obj});
    }

    const sendData = async () => {
      try {
        let result = await axios.post(`/api/${conf.apiVer}/session/`, Login);
        ls.set('connected', true);
        ls.set('uuid', result.data.uuid);
        ls.set('email', Login.email);
        dispatch(saveUser({uuid: result.data.uuid, email: Login.email, connected: true}));
        settoNext(true);
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

    const loginUser = (event) => {
      event.preventDefault();
	    sendData();
    }

    return (
      <Container className={ 'card-1' } maxWidth='sm'>
        {(toNext || connected) && <Redirect to={'/'} />}
          <form  onSubmit={ loginUser } autoComplete="off" noValidate>
            <Grid container spacing={0}>
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