const init = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
};

const login = (state = init, action) => {
    if (action.type === 'SAVELOGIN')
        return {
            email: action.email,
            password: action.password,
            emailError: action.emailError,
            passwordError: action.passwordError,
        };
    return {...state}
}

export default login;