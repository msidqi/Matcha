const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

const userDefaultValues = (user) => {
    user.uuid = uuid();
    user.gender = '';
    user.score = 0;
    user.location = '';
    user.sexualpreferences = '';
    user.biography = '';
	user.pictures = [];
    user.interests = [];
    user.tokken = '';
    user.conTokken = '';
};

const createUser = async (req, res) => {
    try {
        let user = req.body;
		validator.userFieldsExist(user, usersM.createUserFields);
        validator.validateUser(user);
        userDefaultValues(user);
        await usersM.userExists(null, user.username, user.email);
        user.password = await bcrypt.hash(user.password, 10);
        req.user = user;
        next();
    }
    catch (err) {
        res.status(422).json({ error: err });
    }
}
// let isCorrectPasswd = await bcrypt.compare(user.password, hashed);
// console.log(isCorrectPasswd);
const getUserById = async (req, res) => {
    try {
        let user = await usersM.getUserById(req.params.id);
        console.log(user);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(422).json({error: err});
    }
}

const incomingUser = {
	username:           'newuser',
	firstname:          'helloworld',
    lastname:           'helloworld',
    password:           '123456q!',
	email:              'newuser@newuser.com',
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

module.exports = {
    createUser:     createUser,
    getUserById:    getUserById,
}

//creatUSer
//deleteUser

