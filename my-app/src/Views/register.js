import React from 'react';
import { TextField, makeStyles, Container, Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegister } from '../reduxx/actions/save';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';

//css
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
  },
}));
// console.log(__dirname);

function Register() {
  
    // css
    const classes = useStyles();
    // redux state management
    const data = useSelector(state => state.register);
    const dispatch = useDispatch();
    const saveState = (event) => {
      dispatch(saveRegister({...data, [event.target.name]:event.target.value}));
    }

    const registerUser = (event) => {
      event.preventDefault();
      console.log(`
      username : ${data.username}
      firstname : ${data.firstname}
      lastname : ${data.lastname}
      email : ${data.email}
      password : ${data.password}
      `);
      // const sendData = async () => {
      //   try {
      //     // let await fetch();
      //   }
      //   catch (e) {
      //     console.log(`catch: ${e}`);
      //   }
      // }
    }

    return (
      <Container className={classes.container} maxWidth='sm'>
          <form  onSubmit={ registerUser } autoComplete="off" noValidate>
            <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <UserInput
                    label={ 'username' }
                    val={ data.username }
                    func={ saveState }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UserInput
                      label={ 'firstname' }
                      val={ data.firstname }
                      func={ saveState }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'lastname' }
                      val={ data.lastname }
                      func={ saveState }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'email' }
                      val={ data.email }
                      func={ saveState }
                      type="email"
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <UserInput
                      label={ 'password' }
                      val={ data.password }
                      func={ saveState }
                      type="password"
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