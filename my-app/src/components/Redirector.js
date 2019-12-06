import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Redirector() {
    var connected = useSelector(state => state.user.connected);
    var completed = useSelector(state => state.user.completed);

    return (
        <>    
        {(connected && completed === false) && <Redirect to={'/setup'} />}
        </>
    )
}
