import React from 'react';
import { TextField, makeStyles, Container, Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegister } from '../reduxx/actions/save';

//css
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
console.log(__dirname);

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
      const sendData = async () => {
        try {
          await fetch();
        }
        catch (e) {
          console.log(`catch: ${e}`);
        }
      }
    }
    return (
        <Container className={classes.container} maxWidth='sm'>
          <form  onSubmit={ registerUser } autoComplete="off" noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="username"
                    margin="normal"
                    name="username"
                    value={ data.username }
                    onChange={ saveState }
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="firstname"
                    margin="normal"
                    name="firstname"
                    value={ data.firstname }
                    onChange={ saveState }
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="lastname"
                    margin="normal"
                    name="lastname"
                    value={ data.lastname }
                    onChange={ saveState }
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="email"
                    margin="normal"
                    type="email"
                    name="email"
                    value={ data.email }
                    onChange={ saveState }
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="password"
                    margin="normal"
                    type='password'
                    name="password"
                    value={ data.password }
                    onChange={ saveState }
                  />
              </Grid>
              <Grid>
                <Button 
                type="submit"
                color="primary"
                className={classes.submit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          </Container>
    );
}

export default Register;