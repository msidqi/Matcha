
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

const validateConfirmPassword = function (confirmpassword, password) {
    let err = "";

	if ((err = (typeof confirmpassword === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = password === confirmpassword ? "" : "Password does not match.") !== "")
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

const months = {Jan: 1,	Feb: 2,	Mar: 3,	Apr: 4,	May: 5,	Jun: 6,	Jul: 7,	Aug: 8,	Sep: 9,	Oct: 10, Nov: 11, Dec: 12};

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const calculateAge = (birthdate = []) => { //'30/12/2019' format
	let current = new Date().toString();
	let age = -5;

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

const validateGender = (gender) => {
	let err = ''
	if ((err = (typeof gender === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = (gender.length !== 0) ? "" : "Please choose your gender.") !== "")
		return (err);
	if ((err = /^Male$|^Female$/g.test(gender) ? "" : "Gender is either Male or Female.") !== "")
		return (err);
	return err
}

const validateSexpref = (sexualpreference) => {
	let err = ''
	if ((err = (typeof sexualpreference === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	if ((err = (sexualpreference.length !== 0) ? "" : "Please choose your sexual preference.") !== "")
		return (err);
	if ((err = /^Heterosexual$|^Homosexual$|^Bisexual$/g.test(sexualpreference) ? "" : "Choose your orientation.") !== "")
		return (err);
	return err
}

const validateBio = (bio) =>{
	let err = '';

	if ((err = (typeof bio === 'string') ? "" : "variable is not a string.") !== "")
		return (err);
	bio = bio.trim();
	if ((err = (bio.length <= 250) ? "" : "bio is too long (250 characters max).") !== "")
		return (err);
	if ((err = (bio.length >= 0) ? "" : "bio is required.") !== "")
		return (err);
	return(err);
}

const validateTags = (tags = []) =>{
	let err = '';

	if ((err = (tags.length >= 3) ? "" : "Please add a minimum of 3 tags") !== "")
		return (err);
	for (let i = 0; i < tags.length; i++) {
		if (typeof tags[i] !== 'string' || tags[i][0] !== '#' || tags[i].length > 50 || tags[i].length < 2)
			return ('Incorrect tag format.')
	}
	return(err);
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
	if ((err = validateConfirmPassword(user.confirmpassword, user.password)) !== "")
		errors.confirmpasswordError = err;
	if ((err = validateBirthDate(user.birthdateShort)) !== "")
		errors.birthdateShortError = err;
	for (let key in errors) {
		if (errors[key] !== "")
			throw errors;
	}
}

const validateSetup = (user) =>{
	let errors = {};
	let err = "";

	if ((err = validateGender(user.gender)) !== "")
		errors.genderError = err;
	if ((err = validateSexpref(user.sexpref)) !== "")
		errors.sexprefError = err;
	if ((err = validateBio(user.bio)) !== "")
		errors.bioError = err;
	if ((err = validateTags(user.tags)) !== "")
		errors.tagsError = err;
	// if ((err = validatePictures(user.pictures)) !== "")
		// errors.picturesError = err;
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
	gender:				validateGender,
	sexpref:			validateSexpref,
	bio:				validateBio,
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

const fieldsExist = function (toVerify, fieldsRequired) {
	let throwErr = false;
	let errors = {};

	if (typeof toVerify === 'undefined' || toVerify === null)
		throw 'data is undefined.';
	for (const key in fieldsRequired) {
		fieldsRequired[key] = toVerify[key];
	}
	for (let key in fieldsRequired) {
		if (typeof fieldsRequired[key] === 'undefined' || fieldsRequired[key] === null || fieldsRequired[key].length === 0) {
			errors[key] = `field required.`;
			throwErr = true;
		}
	}
	if (throwErr === true)
		throw errors;
}

module.exports = {
    username:				validateUsername,
    password:				validatePassword,
	email:					validateEmail,
	age:					validateAge,
	birthdate:				validateBirthDate,
	user:					validateUser,
	gender:					validateGender,
	sexpref:				validateSexpref,
	bio:					validateBio,
	calculateAge:			calculateAge,
	isValidDate:			isValidDate,
	fieldsExist:			fieldsExist,
	userInfo:				validateUserInfo,
	setup: 					validateSetup,
}

















// const validationFunc = {
// 	username:			validateUsername,
//     password:			validatePassword,
// 	email:				validateEmail,
// 	age:				validateAge,
// 	birthdate:			validateBirthDate,
// 	user:				validateUser,
// 	gender:				validateGender,
// 	sexpref:			validateSexpref,
// 	bio:				validateBio,
// }

// const validateUserInfo = function (params, user) {
// 	let errors = {};
// 	let err = "";

// 	params = params.split(' ');
// 	for (let i = 0; i < params.length; i++) {
// 		let key = params[i];
// 		let val = user[key];
// 		if (val && validationFunc[key] && (err = validationFunc[key](val)) !== "")
// 			errors[`${key}Error`] =	err;
// 	}
// 	for (let key in errors) {
// 		if (errors[key] !== "")
// 			throw errors;
// 	}
// }