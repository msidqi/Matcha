import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


const Profile = ( { match } ) => {

    useEffect(() => { fetchUser() });
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/v1/users/${match.params.id}`);
            const user = await data.json();
            console.log(user);
            setUser(user);
        } catch (err) {
            console.error(err);
        }
    }
    return (
      <>
        <div>
            <h1>This is Users Page</h1>
            <ul>Username: { user.username }</ul>
            <ul>Firstname: { user.firstname }</ul>
            <ul>Lastname: { user.lastname }</ul>
            <ul>Age: { user.age }</ul>
            <ul>Gender: { user.gender }</ul>
            <ul>Score: { user.score }</ul>
            <ul>uuid: { user.uuid }</ul>
        </div>
      </>
    );
}

export default Profile;
  