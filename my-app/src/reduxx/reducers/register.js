const init = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    // age: '',
    birthdate: new Date(),
    birthdateShort: new Date().toLocaleDateString('fr-MA'),
	password: '',
	confirmPassword: '',
	usernameError: '',
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    // ageError: '',
    birthdateError: '',
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
        birthdate: action.birthdate,
        birthdateShort: action.birthdateShort,
		password: action.password,
		confirmPassword: action.confirmPassword,
		usernameError: action.usernameError,
		firstnameError: action.firstnameError,
		lastnameError: action.lastnameError,
		emailError: action.emailError,
		birthdateError: action.birthdateError,
		passwordError: action.passwordError,
		confirmPasswordError: action.confirmPasswordError,
    };
    return {...state};
}

export default register;