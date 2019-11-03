


var validateUsername = function (userName) {
    var err = "";
    
    if ((err = (typeof userName === 'string') ? "" : "Error: variable is not a string") !== "")
        return (err);
    if ((err = /^(.){6,}$/.test(userName) ? "" : "Username must be at least 6 characters") !== "")
        return (err);
    if ((err = /^(.){0,20}$/.test(userName) ? "" : "Username can't be longer than 20 characters") !== "")
        return (err);
    if ((err = /^(?=.*[0-9])?(?=.*[a-zA-Z])([a-zA-Z0-9]){6,20}$/.test(userName) ? "" : "Username must contain only characters and optionally digits") !== "")
        return (err);
    // query if username already exists
    return (err);
};



var validatePassword = function (password) {
    var err = "";
    
    if ((err = (typeof password === 'string') ? "" : "Error: variable is not a string") !== "")
        return (err);
    if ((err = /^(?=.*[!-~])([!-~]){8,}$/.test(password) ? "" : "Password must be at least 8 characters") !== "")
        return (err);
    if ((err = /^(?=.*[!-~])([!-~]){0,100}$/.test(password) ? "" : "Password can't be longer than 100 characters") !== "")
        return (err);
    if ((err = /^(?=.*[!-/{-~[-`:-@])(?=.*[A-Za-z])(?=.*[\d])([!-~]){8,100}$/.test(password) ? "" : "Password must contain at least one character, a number and a special character ") !== "")
        return (err);
    return (err);
};

var validateEmail = function (email) {
    var err = "";
    
    if ((err = (typeof password === 'string') ? "" : "Error: variable is not a string") !== "")
        return (err);
    if ((err = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(password) ? "" : "Not a valide email address") !== "")
        return (err);
    return (err);
};



module.exports = {
    username: validateUsername,
    password: validatePassword,
    email: validateEmail,
}