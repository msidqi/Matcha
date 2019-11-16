const init = {
    email: '',
    password: '',
};

const login = (state = init, action) => {
    if (action.type === 'SAVELOGIN')
        return {
            email: action.email,
            password: action.password,
        };
    return {...state}
}

export default login;