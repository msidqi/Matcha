
const validateUsername = function (userName) {
    let err = "";
    
    if ((err = (typeof userName === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = userName.length !== 0 ? "" : "Please enter your username.") !== "")
		return (err);
    if ((err = /^(.){6,}$/.test(userName) ? "" : "Username must be at least 6 characters.") !== "")
        return (err);
    if ((err = /^(.){0,20}$/.test(userName) ? "" : "Username can't be longer than 20 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[0-9])?(?=.*[a-zA-Z])([a-zA-Z0-9]){6,20}$/.test(userName) ? "" : "Username must contain only characters and optionally digits.") !== "")
		return (err);
    return (err);
}

const validateName = function (flastName) {
    let err = "";
    
    if ((err = (typeof flastName === 'string') ? "" : "variable is not a string.") !== "")
        return (err);
	if ((err = flastName.length !== 0 ? "" : "Please enter a name.") !== "")
		return (err);
	if ((err = /^(.){4,}$/.test(flastName) ? "" : "Your name must be at least 4 characters.") !== "")
        return (err);
    if ((err = /^(.){0,20}$/.test(flastName) ? "" : "Your name can't be longer than 20 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[a-zA-Z])([a-zA-Z]){4,20}$/.test(flastName) ? "" : "Your name must contain only characters.") !== "")
        return (err);
    return (err);
}

const validatePassword = function (password) {
    let err = "";
    
    if ((err = (typeof password === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = password.length !== 0 ? "" : "Please enter a password.") !== "")
		return (err);
    if ((err = /^(?=.*[!-~])([!-~]){8,}$/.test(password) ? "" : "Password must be at least 8 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[!-~])([!-~]){0,100}$/.test(password) ? "" : "Password can't be longer than 100 characters.") !== "")
        return (err);
    if ((err = /^(?=.*[!-/{-~[-`:-@])(?=.*[A-Za-z])(?=.*[\d])([!-~]){8,100}$/.test(password) ? "" : "Password must contain at least one character, a number and a special character.") !== "")
        return (err);
    return (err);
}

const validateEmail = function (email) {
    let err = "";

    if ((err = (typeof email === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = email.length !== 0 ? "" : "Please enter an email.") !== "")
		return (err);
    if ((err = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? "" : "Not a valide email address.") !== "")
        return (err);
    return (err);
}

const validateAge = function (age) {
    let err = "";
    
    if ((err = (!isNaN(age)) ? "" : "age is just a number.") !== "")
		return (err);
	if ((err = (age >= 18) ? "" : "User must be 18 or older.") !== "")
		return (err);
	if ((err = (age < 91) ? "" : "BRUH go visit your grand children.") !== "")
		return (err);
    return (err);
}






const months = {Jan: 1,	Feb: 2,	Mar: 3,	Apr: 4,	May: 5,	Jun: 6,	Jul: 7,	Aug: 8,	Sep: 9,	Oct: 10, Nov: 11, Dev: 12};

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const calculateAge = (birthdate = []) => { //'30/12/2019' format
	let current = new Date().toString();
	let age = -1;

	birthdate = birthdate.split('/');
	current = current.split(' ');
	current = [current[2], months[current[1]], current[3]]

	if (current[1] > birthdate[1])
		age = current[2] - birthdate[2];
	else if (current[1] < birthdate[1])
		age = current[2] - birthdate[2] - '1';
	else if (current[1] == birthdate[1])
		age = (current[0] > birthdate[0]) ? current[2] - birthdate[2] : current[2] - birthdate[2] - '1';
	return age;
}

const isValidDate = (date) => {

	if (!/(\d\d)\/(\d\d)\/(\d\d\d\d)/.test(date))
		return false;
	let [day, month, year] = date.split('/');

	year = parseInt(year);
	month = parseInt(month);
	day = parseInt(day);

	if (!(year > 0 || month > 0 || day > 0 || day <= 31 || month <= 12))
		return false;
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthDays[1] = 29;

	if (!(day <= monthDays[(month) - 1]))
		return false;
	return true;
}

const validateBirthDate = function (birthdate) {
    let err = "";

    if ((err = (typeof birthdate === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = (isValidDate(birthdate)) ? "" : "Invalid date.") !== "")
		return (err);
	let age = calculateAge(birthdate);
	if ((err = (age >= 18) ? "" : "You must be 18 or older.") !== "")
		return (err);
	if ((err = (age < 91) ? "" : "Go visit your grand children, man.") !== "")
		return (err);
    return (err);
}







const validateUser = function (user) {
	let errors = {};
	let err = "";

    if ((err = validateUsername(user.username)) !== "")
		errors.usernameError = err;
    if ((err = validateName(user.firstname)) !== "")
		errors.firstnameError = err;
    if ((err = validateName(user.lastname)) !== "")
		errors.lastnameError = err;
    if ((err = validateEmail(user.email)) !== "")
		errors.emailError = err;
    if ((err = validatePassword(user.password)) !== "")
		errors.passwordError = err;
	if ((err = validateBirthDate(user.birthdateShort)) !== "")
		errors.birthdateError = err;
	for (let key in errors) {
		if (errors[key] !== "")
			throw errors;
	}
}

const validationFunc = {
	username:			validateUsername,
    password:			validatePassword,
	email:				validateEmail,
	age:				validateAge,
	birthdate:			validateBirthDate,
	user:				validateUser,
}

const validateUserInfo = function (params, user) {
	let errors = {};
	let err = "";

	params = params.split(' ');
	for (let i = 0; i < params.length; i++) {
		let key = params[i];
		let val = user[key];
		if (val && validationFunc[key] && (err = validationFunc[key](val)) !== "")
			errors[`${key}Error`] =	err;
	}
	for (let key in errors) {
		if (errors[key] !== "")
			throw errors;
	}
}

const userFieldsExist = function (incomingUser, userFields) {
	let throwErr = false;
	let errors = {};

	if (typeof incomingUser === 'undefined' || incomingUser === null)
		throw {error: 'user is undefined.'};
	for (const key in userFields) {
		userFields[key] = incomingUser[key];
	}
	for (let key in userFields) {
		if (typeof userFields[key] === 'undefined' || userFields[key] === null) {
			errors[key] = `field required.`;
			throwErr = true;
		}
	}
	if (throwErr === true)
		throw errors;
}

const loginFieldsExist = function (incomingUser, loginFields) {
	let throwErr = false;
	let errors = {};

	if (typeof incomingUser === 'undefined' || incomingUser === null)
		throw {error: 'user is undefined.'};
	for (const key in loginFields) {
		loginFields[key] = incomingUser[key];
	}
	for (let key in loginFields) {
		if (typeof loginFields[key] === 'undefined' || loginFields[key] === null) {
			errors[key] = `field required.`;
			throwErr = true;
		}
	}
	if (throwErr === true)
		throw errors;
}

const gender = ['male', 'female'];
const sexualpreferences = ['str', 'bi', 'h'];

module.exports = {
    username:			validateUsername,
    password:			validatePassword,
	email:				validateEmail,
	age:				validateAge,
	birthdate:			validateBirthDate,
	user:				validateUser,
	userFieldsExist:	userFieldsExist,
	calculateAge:		calculateAge,
	isValidDate:		isValidDate,
	loginFieldsExist:	loginFieldsExist,
	validateUserInfo:	validateUserInfo,
}