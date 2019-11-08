import React from 'react';
import { Link } from 'react-router-dom'


function Nav() {
    const white = {color: 'white'};

    return (
      <>
        <div className="navbar" >
            <ul>
                <li>
                    <Link style={white} to="/home">Home</Link>
                </li>
                <li>
                    <Link style={white} to="/users">Users</Link>
                </li>
                <li>
                    <Link style={white} to="/register">Register</Link>
                </li>
                <li>
                    <Link style={white} to="/login">Login</Link>
                </li>
            </ul>
        </div>
      </>
    );
}
  
  export default Nav;
