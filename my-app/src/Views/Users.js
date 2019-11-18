import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import conf from '../config/config';

function Users() {
	const black = {color: 'black'};

    
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const data = await fetch(`${conf.apiUrl}/users`);
			const users = await data.json();
			console.log(users)
            setUsers(users);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => { fetchUsers() }, []);
    
    return (
      <>
        <div>
            <h1>This is Users Page</h1>
            <ul>
            { users.map( user => (
            <li key={ user.uuid }>
                <Link style={black} to={`/users/${user.uuid}`} >{ user.username }</Link>
            </li>
            ) ) }
            </ul>
        </div>
      </>
    );
}

export default Users;
  