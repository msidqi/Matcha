const init = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    age: '',
	password: '',
	confirmPassword: '',
	usernameError: '',
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    ageError: '',
    passwordError: '',
    confirmPasswordError: '',
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
		confirmPassword: action.confirmPassword,
		usernameError: action.usernameError,
		firstnameError: action.firstnameError,
		lastnameError: action.lastnameError,
		emailError: action.emailError,
		ageError: action.ageError,
		passwordError: action.passwordError,
		confirmPasswordError: action.confirmPasswordError,
    };
    return {...state};
}

export default register;