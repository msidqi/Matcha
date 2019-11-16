const init = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    age: 0,
    password: '',
};

const register = (state = init, action) => {
    if (action.type === 'SAVEREGISTER')
    return {
        username: action.username,
        firstname: action.firstname,
        lastname: action.lastname,
        email: action.email,
        age: action.age,
        password: action.password,
    };
    return {...state};
}

export default register;