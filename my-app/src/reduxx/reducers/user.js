import ls from 'local-storage';

const init = {
    connected:  ls.get('connected'),
    email:      ls.get('email'),
    uuid:       ls.get('uuid'),
    verified:   ls.get('verified'),
    completed:  ls.get('completed'),
    username:  ls.get('username'),
}
const userReducer = (state = init, action) => {
	if (action.type === 'EDITUSER')
        return {
            connected:  ls.get('connected'),
            email:      ls.get('email'),
            verified:   ls.get('verified'),
            completed:  ls.get('completed'),
            uuid:       ls.get('uuid'),
            username:  ls.get('username'),
        };
    return {...state};
}

export default userReducer;