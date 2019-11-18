import React from 'react';
import { makeStyles, Container, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegister } from '../reduxx/actions/save';
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

function Register() {
  
    // css
    const classes = useStyles();
    // redux state management
    const data = useSelector(state => state.register);
    const dispatch = useDispatch();
    const saveState = (event, obj = null) => {
	  if (obj !== null)
		dispatch(saveRegister({...data, ...obj}));
	  else
    	dispatch(saveRegister({...data, [event.target.name]:event.target.value}));
    }

    const registerUser = (event) => {
      event.preventDefault();
      console.log(`
      username : ${data.username}
      firstname : ${data.firstname}
      lastname : ${data.lastname}
      email : ${data.email}
      age : ${data.age}
      password : ${data.password}
      `);
      const sendData = async () => {
        try {
          let result = await axios.post(`${conf.apiUrl}/users`, data);
		  console.log('success');
		  console.log(result);
        }
        catch (e) {
			if (e.response.data.errors) {
				saveState(null, { usernameError:e.response.data.errors.username });
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
					func={ saveState }
					helperText={ data.usernameError }
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
                      label={ 'age' }
                      val={ data.age }
                      func={ saveState }
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