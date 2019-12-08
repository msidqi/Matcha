import React from 'react'
import { Redirect } from 'react-router-dom';
import UserState from './UserState';

export default function AccountSetup() {

    const {connected, completed} = UserState();
    return (
        <>    
        {(connected && !completed) && <Redirect to={'/setup'} />}
        </>
    );
}
