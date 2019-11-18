import React/*, { useState }*/ from 'react';



function Login() {
    return (
      <>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <button type="submit" method="POST">Login</button>
      </>
    );
}
  
  export default Login;
  