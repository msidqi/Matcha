import React from 'react';



function Register({ param1, param2 }) {
    return (
      <>
        <input type="text" placeholder="username"/>
        <input type="text" placeholder="firtname"/>
        <input type="text" placeholder="lastname"/>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="password"/>
        <button type="submit" method="POST">Register: { param1 } | { param2 }</button>
      </>
    );
}
  
  export default Register;
  