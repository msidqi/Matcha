const init = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    age: 0,
};

const register = (state = init, action) => {
    if (action.type === 'SAVE')
    return {
        username: action.username,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
        age: state.age + 1,
    };
    return {...state};
}

export default register;