const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

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
        validator.validateUser(user);
        userDefaultValues(user);
        await usersM.userExists(null, user.username, user.email);
        user.password = await bcrypt.hash(user.password, 10);
		let uuid = await usersM.storeUser(user);
        res.status(201).json({uuid: uuid});
    }
    catch (err) {
		if (typeof err.message === 'string')
			res.status(422).json({ error: err.message });
		else
			res.status(422).json({ errors: err });
    }
}
// let isCorrectPasswd = await bcrypt.compare(user.password, hashed);
// console.log(isCorrectPasswd);
const getUserById = async (req, res) => {
    try {
        let user = await usersM.loadUserById(req.params.id);
	    delete user.tokken;
	    delete user.conTokken;
	    delete user.password;
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

const asy =  async () => {
    try {
		let user = incomingUser;
		// console.log(JSON.stringify(incomingUser))
        validator.userFieldsExist(user, usersM.createUserFields);
        validator.validateUser(user);
        user.password = await bcrypt.hash(user.password, 10);
        userDefaultValues(user);
        await usersM.userExists(null, user.username, user.email);
    } catch (err) {
        console.error(err);
    }
}
// asy();


const getUsersAll = async (req, res) => {
	try {
		let result = await usersM.loadUsersAll();
		var arr = [];
		result.records.forEach(record => {
		  delete record.get('n').properties.conTokken;
		  delete record.get('n').properties.tokken;
			delete record.get('n').properties.password;
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
}

//creatUSer
//deleteUser

