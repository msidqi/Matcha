import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';
// import { saveRegister } from '../reduxx/actions/save';
import BirthDate from '../components/BirthDate';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';


function Register() {

    const connected = ls.get('connected');
    const init = {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			birthdate: new Date(),
      birthdateShort: new Date().toLocaleDateString('fr-MA'),
			password: '',
			confirmpassword: '',
      usernameError: '',
      firstnameError: '',
      lastnameError: '',
      emailError: '',
      birthdateShortError: '',
      passwordError: '',
      confirmpasswordError: '',
    };
    const [Register, setRegister] = useState(init)

    const handleEventChange = (event) => {
      setRegister({...Register, [event.target.name]:event.target.value});
    }

    const handleErrors = (obj) => {
      setRegister({...Register, ...obj});
    }

    const handleDateChange = (date) => {
      setRegister({...Register, birthdate: date, birthdateShort: date.toLocaleDateString('fr-MA')});
    }

    const [toNext, settoNext] = useState(false);

    const sendData = async () => {
      try {
        await axios.post(`/api/${conf.apiVer}/users`, Register);
        settoNext(true);
      }
      catch (e) {
        if (e.response.data.errors) {
          const errors = {
            usernameError: e.response.data.errors.usernameError,
            firstnameError: e.response.data.errors.firstnameError,
            lastnameError: e.response.data.errors.lastnameError,
            emailError: e.response.data.errors.emailError,
            birthdateShortError: e.response.data.errors.birthdateShortError,
            passwordError: e.response.data.errors.passwordError,
            confirmpasswordError: e.response.data.errors.confirmpasswordError,
          }
        handleErrors(errors);
        }
      }
    }

    const registerUser = (event) => {
      event.preventDefault();
	    sendData();
    }

    return (
      <Container className={ 'card-1'} maxWidth='sm'>
        {(toNext || connected) && <Redirect to="/login"/>}
          <form  onSubmit={ registerUser } autoComplete="off" noValidate>
            <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <UserInput
                      label={ 'username' }
                      val={ Register.username }
                      func={ handleEventChange }
                      helperText={ Register.usernameError }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput
                      label={ 'firstname' }
                      val={ Register.firstname }
                      func={ handleEventChange }
                      helperText={ Register.firstnameError }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'lastname' }
                      val={ Register.lastname }
                      func={ handleEventChange }
                      helperText={ Register.lastnameError }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'email' }
                      val={ Register.email }
                      func={ handleEventChange }
                      helperText={ Register.emailError }
                      type="email"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'password' }
                      val={ Register.password }
                      func={ handleEventChange }
                      helperText={ Register.passwordError }
                      type="password"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'confirmpassword' }
                      val={ Register.confirmpassword }
                      func={ handleEventChange }
                      helperText={ Register.confirmpasswordError }
                      type="password"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <BirthDate 
                        val={ Register.birthdate }
                        func={ handleDateChange }
                        helperText={ Register.birthdateShortError }
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