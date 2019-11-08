import React, { useState, useEffect } from 'react';



function Users() {

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
            { users.map( user => (<li key={ user.uuid }> { user.username }</li>) ) }
            </ul>
        </div>
      </>
    );
}

export default Users;
  