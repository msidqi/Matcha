import React from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegister } from '../reduxx/actions/save';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import BirthDate from '../components/BirthDate';
import conf from '../config/config';
import axios from 'axios';

//css
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
  },
}));

function Register() {

    // css
    const classes = useStyles();
    // redux state management
    const data = useSelector(state => state.register);
    const dispatch = useDispatch();

    const handleEventChange = (event, obj = null) => {
        dispatch(saveRegister({...data, [event.target.name]:event.target.value}));
    }

    const handleChange = (obj) => {
      dispatch(saveRegister({...data, ...obj}));
    }
    const handleDateChange = (date) => {
      dispatch(saveRegister({...data, birthdate: date, birthdateShort: date.toLocaleDateString('fr-MA')}));
    }

    const registerUser = (event) => {
      event.preventDefault();
      // console.log(data);
      const sendData = async () => {
        try {
          let result = await axios.post(`${conf.apiUrl}/users`, data);
          // console.log('success');
          // console.log(result.data);
          const reset = {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			birthdate: '',
			birthdateShort: '',
			password: '',
            usernameError: '',
            firstnameError: '',
            lastnameError: '',
            emailError: '',
            birthdateError: '',
            passwordError: '',
          };
          handleChange(reset);
        }
        catch (e) {
          if (e.response.data.errors) {
            const errors = {
              usernameError: e.response.data.errors.usernameError,
              firstnameError: e.response.data.errors.firstnameError,
              lastnameError: e.response.data.errors.lastnameError,
              emailError: e.response.data.errors.emailError,
              birthdateError: e.response.data.errors.birthdateError,
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
          <form  onSubmit={ registerUser } autoComplete="off" noValidate>
            <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <UserInput
                      label={ 'username' }
                      val={ data.username }
                      func={ handleEventChange }
                      helperText={ data.usernameError }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput
                      label={ 'firstname' }
                      val={ data.firstname }
                      func={ handleEventChange }
                      helperText={ data.firstnameError }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'lastname' }
                      val={ data.lastname }
                      func={ handleEventChange }
                      helperText={ data.lastnameError }
                      />
                  </Grid>
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
                  <Grid item xs={12}>
                      <BirthDate 
                        val={ data.birthdate }
                        func={ handleDateChange }
                        helperText={ data.birthdateError }
                      />
                  </Grid>
                  <Grid>
                    <Submit
                      val={ 'Register' }
                    />
                  </Grid>
            </Grid>
          </form>
      </Container>
    );
}

export default Register;