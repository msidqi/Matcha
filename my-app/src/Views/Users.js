import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import conf from '../config/config';
import axios from 'axios';

function Users() {
	const black = {color: 'black'};

    
    const [users, setUsers] = useState([]);
    

    useEffect(() => { 
        const CancelToken = axios.CancelToken;
        let cancel;
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`/api/${conf.apiVer}/users/`, { cancelToken: new CancelToken(function executor(c) {
                    // An executor function receives a cancel function as a parameter
                    cancel = c;
                    }) });
                const users = res.data;
                console.log(users)
                setUsers(users);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
        return (cancel);
    }, []);
    
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
  