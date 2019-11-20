import React from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveLogin } from '../reduxx/actions/save';
// import { editTokken } from '../reduxx/actions/editTokken';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';
import axios from 'axios';

//css
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
  },
}));

function Login() {

    // css
    const classes = useStyles();
    // redux state management
    const data = useSelector(state => state.login);
    const dispatch = useDispatch();

    const handleEventChange = (event, obj = null) => {
        dispatch(saveLogin({...data, [event.target.name]:event.target.value}));
    }

    const handleChange = (obj) => {
      dispatch(saveLogin({...data, ...obj}));
    }

    const loginUser = (event) => {
      event.preventDefault();
      console.log(data);
      const sendData = async () => {
        try {
          let result = await axios.post(`${conf.apiUrl}/session/`, data);
          console.log('success');
          console.log(result.data);
          const errors = {
            emailError: '',
            passwordError: '',
          };
		  handleChange(errors);
		//   dispatch(editTokken(result.data));
        }
        catch (e) {
          if (e.response.data.errors) {
            const errors = {
              emailError: e.response.data.errors.emailError,
              passwordError: e.response.data.errors.passwordError,
            };
            handleChange(errors);
			    }
        }
	    }
	    sendData();
    }

    return (
      <Container className={classes.container} maxWidth='sm'>
          <form  onSubmit={ loginUser } autoComplete="off" noValidate>
            <Grid container spacing={0}>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'email' }
                      val={ data.email }
                      func={ handleEventChange }
                      helperText={ data.emailError }
                      type="email"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'password' }
                      val={ data.password }
                      func={ handleEventChange }
                      helperText={ data.passwordError }
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