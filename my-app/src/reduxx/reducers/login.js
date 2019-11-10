const init = {
    email: '',
};

const login = (state = init, action) => {
    if (action.type === 'SAVE')
        return {
            email: action.email,
        };
    return {...state}
}

export default login;