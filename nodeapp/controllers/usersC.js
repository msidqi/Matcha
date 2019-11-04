const validator = require('../helpers/validator');
const usersM = require('../models/usersM');

const createUser = (req, res, next) => {
    try {
		validator.userFieldsExist(req.body, usersM.createUserFields);
		validator.user(req.body);
		// hash password
        next();
    }
    catch (err) {
        res.status(422).json({ error: err });
    }
}


let incomingUser = {
	username: 'helloworld*12eqweqwdqdqwdqdqdqed',
	firstname: 'helloworld',
	lastname: 'helloworld',
	email: 'hello@gmail.com',
	age: 26,
	score: 10,
	location: 'dasdqw',
	gender: 'male',
	sexualpreferences: 'straight',
	biography: 'location',
	pictures: ['pic1', 'pic2'],
	interests: ['sports', 'chess'],
};
try {
	validator.userFieldsExist(incomingUser, usersM.createUserFields);
} catch (err) {
	console.log(err);
}




module.exports = {
    createUser : createUser,
}

//creatUSer
//deleteUser