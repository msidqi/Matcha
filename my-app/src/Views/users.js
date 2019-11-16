import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Users() {
	const white = {color: 'white'};

    useEffect(() => { fetchUsers() }, []);
    
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const data = await fetch('http://localhost:3001/api/v1/users');
            const users = await data.json();
            console.log(users);
            setUsers(users);
        } catch (err) {
            console.error(err);
        }
    }
    return (
      <>
        <div>
            <h1>This is Users Page</h1>
            <ul>
            { users.map( user => (
            <li key={ user.uuid }>
                <Link style={white} to={`/users/${user.uuid}`} >{ user.username }</Link>
            </li>
            ) ) }
            </ul>
        </div>
      </>
    );
}

export default Users;
  