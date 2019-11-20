const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const auth = require('./auth');


const userDefaultValues = (user) => {
    user.uuid = uuid();
    user.gender = '';
    user.score = 0;
    // user.location = '';
    user.sexualpreferences = '';
    user.biography = '';
	user.pictures = [];
    // user.interests = [];
    user.tokken = '';
    user.conTokken = '';
};

const createUser = async (req, res) => {
    try {
        let user = req.body;
		validator.userFieldsExist(user, usersM.createUserFields());
        validator.user(user);
        userDefaultValues(user);
        await usersM.userExists(null, user.username, user.email);
        user.password = await bcrypt.hash(user.password, 10);
		let uuid = await usersM.storeUser(user);
        res.status(201).json({uuid: uuid});
    }
    catch (err) {
		console.log(err);
		if (typeof err.message === 'string')
			res.status(422).json({ error: err.message });
		else
			res.status(400).json({ errors: err });
    }
}

const loginUser = async (req, res) => {
	try {
		let user = req.body;
		let err = "";

		validator.loginFieldsExist(user, usersM.loginFields());
		if (err = validator.email(user.email))
			throw { emailError: err };
		let userdb = await usersM.loadUserBy('email', user.email);
		if (user.password == "" || !user.password || !await bcrypt.compare(user.password, userdb.password))
			throw { passwordError: 'Incorrect password.'};

		const JWT = auth.createJWT(userdb.uuid);
		await usersM.storeJWT(userdb.uuid, JWT);
		res.cookie('JWT', JWT, { httpOnly: true });
		res.status(200).json( { msg: 'logged in', uuid: userdb.uuid } );
	}
	catch (err) {
		console.log(err);
		if (typeof err.message === 'string')
			res.status(422).json({ error: err.message });
		else
			res.status(400).json({ errors: err });
	}
}

const logoutUser = async (req, res) => {
	try {
		let user = req.body;

		await usersM.deleteJWT(user.uuid);
		res.clearCookie('JWT');
		res.status(200).json( { msg: 'user has logged out.' } );
	}
	catch (err) {
		console.log(err);
		if (typeof err.message === 'string')
			res.status(422).json({ error: err.message });
		else
			res.status(400).json({ errors: err });
	}
}

const getUserById = async (req, res) => {
    try {
        let user = await usersM.loadUserById(req.params.id);
	    delete user.tokken;
	    delete user.conTokken;
		delete user.password;
		delete user.email;
		user.age = validator.calculateAge(user.birthdateShort);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(422).json({error: err.message});
    }
}

const incomingUser = {
	username:           'newuseer',
	firstname:          'helloworld',
    lastname:           'helloworld',
    password:           '123456q!',
	email:              'newusedr@newuser.com',
	age:                26,
	score:              10,
	location:           'dasdqw',
	gender:             'male',
	sexualpreferences:  'straight',
	biography:          'location',
	pictures:           ['pic1', 'pic2'],
	interests:          ['sports', 'chess'],
};

const getUsersAll = async (req, res) => {
	try {
		let result = await usersM.loadUsersAll();
		var arr = [];
		result.records.forEach(record => {
		  delete record.get('n').properties.conTokken;
		  delete record.get('n').properties.tokken;
		  delete record.get('n').properties.password;
		  delete record.get('n').properties.email;
		  arr.push(record.get('n').properties);
		});
		res.status(200).json(arr);
	  }
	  catch (err) {
		res.status(501).json(err);
	  }
}

module.exports = {
	createUser:     createUser,
	getUsersAll:	getUsersAll,
	getUserById:    getUserById,
	loginUser:		loginUser,
	logoutUser:		logoutUser,
}

//deleteUser

