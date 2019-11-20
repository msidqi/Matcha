import React, { useState, useEffect } from 'react';
import conf from '../config/config';


const Profile = ( { match } ) => {

    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const data = await fetch(`${conf.apiUrl}/users/${match.params.id}`);
			const user = await data.json();
			console.log('here');
			// console.log(user);
			setUser(user);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => { fetchUser() }, []);
    return (
      <>
        <div>
            <h1>This is Users Page</h1>
            <ul>Username: { user.username }</ul>
            <ul>Firstname: { user.firstname }</ul>
            <ul>Lastname: { user.lastname }</ul>
            <ul>Age: { user.birthdateShort }</ul>
            <ul>Age: { user.age }</ul>
            <ul>Gender: { user.gender }</ul>
            <ul>Score: { user.score }</ul>
            <ul>uuid: { user.uuid }</ul>
        </div>
      </>
    );
}

export default Profile;
  