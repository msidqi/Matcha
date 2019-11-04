


const validateUsername = function (userName) {
    let err = "";
    
    if ((err = (typeof userName === 'string') ? "" : "Error: variable is not a string.") !== "")
		return (err);
	if ((err = userName.length === 0 ? "" : "Error : Please enter your username") !== "")
		return (err);
    if ((err = /^(.){6,}$/.test(userName) ? "" : "Username must be at least 6 characters.") !== "")
        return (err);
    if ((err = /^(.){0,20}$/.test(userName) ? "" : "Username can't be longer than 20 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[0-9])?(?=.*[a-zA-Z])([a-zA-Z0-9]){6,20}$/.test(userName) ? "" : "Username must contain only characters and optionally digits.") !== "")
        return (err);
    return (err);
};

const validateName = function (flastName) {
    let err = "";
    
    if ((err = (typeof flastName === 'string') ? "" : "Error: variable is not a string.") !== "")
        return (err);
	if ((err = flastName.length === 0 ? "" : "Error : Please enter a name.") !== "")
		return (err);
	if ((err = /^(.){4,}$/.test(flastName) ? "" : "Your name must be at least 4 characters.") !== "")
        return (err);
    if ((err = /^(.){0,20}$/.test(flastName) ? "" : "Your name can't be longer than 20 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[a-zA-Z])([a-zA-Z]){4,20}$/.test(flastName) ? "" : "Your name must contain only characters.") !== "")
        return (err);
    return (err);
};


const validatePassword = function (password) {
    let err = "";
    
    if ((err = (typeof password === 'string') ? "" : "Error: variable is not a string.") !== "")
		return (err);
	if ((err = password.length === 0 ? "" : "Error : Please enter a password.") !== "")
		return (err);
    if ((err = /^(?=.*[!-~])([!-~]){8,}$/.test(password) ? "" : "Password must be at least 8 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[!-~])([!-~]){0,100}$/.test(password) ? "" : "Password can't be longer than 100 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[!-/{-~[-`:-@])(?=.*[A-Za-z])(?=.*[\d])([!-~]){8,100}$/.test(password) ? "" : "Password must contain at least one character, a number and a special character.") !== "")
        return (err);
    return (err);
};

const validateEmail = function (email) {
    let err = "";
    
    if ((err = (typeof email === 'string') ? "" : "Error: variable is not a string.") !== "")
		return (err);
	if ((err = email.length === 0 ? "" : "Error : Please enter an email.") !== "")
		return (err);
    if ((err = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? "" : "Not a valide email address.") !== "")
        return (err);
    return (err);
};

const validateUser = function (user) {
	let errors = {
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		password: ""
	};
	let err = "";

    if ((err = validateUsername(user.username)) !== "")
        errors.username = err;
    if ((err = validateName(user.firstname)) !== "")
		errors.firstname = err;
    if ((err = validateName(user.lastname)) !== "")
		errors.lastname = err;
    if ((err = validateEmail(user.email)) !== "")
		errors.email = err;
    if ((err = validatePassword(user.password)) !== "")
		errors.password = err;
	for (e in errors) {
		if (e !== "")
			throw errors;
	}
}

const userFieldsExist = function (incomingUser, userFields) {
	let err = 0;
	let errors = {};

	userFields.username				= incomingUser.username;
	userFields.firstname			= incomingUser.firstname;
	userFields.lastname				= incomingUser.lastname;
	userFields.email				= incomingUser.email;
	userFields.age					= incomingUser.age;
	userFields.score				= incomingUser.score;
	userFields.location				= incomingUser.location;
	userFields.gender				= incomingUser.gender;
	userFields.sexualpreferences	= incomingUser.sexualpreferences;
	userFields.biography			= incomingUser.biography;
	userFields.pictures				= incomingUser.pictures;
	userFields.interests			= incomingUser.interests;
	for (let elem in userFields) {
		if (typeof userFields[elem] === 'undefined' || userFields[elem] === null) {
			errors[elem] = `field required.`;
			err = 1;
		}
	}
	if (err === 1)
		throw errors;
}

module.exports = {
    username:			validateUsername,
    password:			validatePassword,
    email:				validateEmail,
	validateUser:		validateUser,
	userFieldsExist:	userFieldsExist,
}