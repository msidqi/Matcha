import ls from 'local-storage';

const init = {
    connected: ls.get('connected'),
    email:      ls.get('email'),
    uuid:       ls.get('uuid'),
}
const userReducer = (state = init, action) => {
	if (action.type === 'EDITUSER')
        return {
            connected:  ls.get('connected'),
            email:      action.email,
            uuid:       ls.get('uuid'),
        };
    return {...state}
}

export default userReducer;