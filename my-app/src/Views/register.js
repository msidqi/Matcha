import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import './register.css';
import Email from '../components/Email';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegister } from '../reduxx/actions/save';

function Register() {

  const [info, setInfo] = useState({
    username:   '',
    firstname:  '',
    lastname:   '',
    email:      '',
    age:        0,
  })

  console.log(info)
  
    const {username, firstname, lastname, email, age} = useSelector(state => state.register);
    const dispatch = useDispatch();

    const change = (event) => {
      setInfo({...info, [event.target.name]:event.target.value});
    }

    return (
      <>
        <FormGroup>
        <FormLabel>Username:</FormLabel>
          <FormControl type="text" placeholder="username" name="username" onChange={change} value={info.username} />
        </FormGroup>
        <FormGroup>
        <FormLabel>Email:</FormLabel>
          <FormControl type="text" placeholder="name@example.com" name="email" onChange={change} value={info.email} />
        </FormGroup>
        <button onClick={() => dispatch(saveRegister(info))} type="submit" method="POST">Register</button>
      </>
    );
}
  
  export default Register;
  