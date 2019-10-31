


var userName = function (userName) {
    var err = "";
    
    err = (typeof userName === 'string') ? "" : "Error: variable is not a string";
    if (err !== ""){
        console.error(err);
        return (err);
    }
    err = /^(?=.*[0-9])?(?=.*[a-zA-Z])([a-zA-Z0-9]){5,15}$/.test(userName) ? "" : "Error, username must contain only characters and optionally digits";
    // check if username already exists
    return (err);
};


userName('herilay2');



var password = function (password) {
    var err = "";
    
    err = (typeof password === 'string') ? "" : "Error: variable is not a string";
    if (err !== ""){
        console.error(err);
        return (err);
    }
    err = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){5,15}$/.test(password) ? "" : "Error, password must contain only characters and optionally digits";
    // check if username already exists
    return (err);
};




























module.exports = {
    userName: userName,
}