


const validateUsername = function (userName) {
    let err = "";
    
    if ((err = (typeof userName === 'string') ? "" : "Error: variable is not a string.") !== "")
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
    if ((err = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? "" : "Not a valide email address.") !== "")
        return (err);
    return (err);
};

const validateUser = function (user) {
    let err = "";
    if ((err = validateUsername(user.username)) !== "")
        throw err;
    if ((err = validateName(user.firstname)) !== "")
        throw err;
    if ((err = validateName(user.lastname)) !== "")
        throw err;
    if ((err = validateEmail(user.email)) !== "")
        throw err;
    if ((err = validatePassword(user.password)) !== "")
        throw err;
}


module.exports = {
    username: validateUsername,
    password: validatePassword,
    email: validateEmail,
    user : validateUser,
}