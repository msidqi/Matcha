import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import './register.css';
import Email from '../components/Email';

function Register() {
  
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <>
        <FormGroup>
        <FormLabel>Username:</FormLabel>
          <FormControl type="text" placeholder="username" />
        </FormGroup>
        <Email />
        
        <input type="text" placeholder="username"/>
        <input type="text" placeholder="firtname"/>
        <input type="text" placeholder="lastname"/>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <button type="submit" method="POST">Register</button>
      </>
    );
}
  
  export default Register;
  