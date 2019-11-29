const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const auth = require('../middlewares/auth');


//       add/correct user values before registration 
const userDefaultValues = (user) => {
    user.uuid = uuid();
    user.gender = '';
    user.score = 0;
    user.sexualpreferences = '';
    user.biography = '';
	user.pictures = [];
    user.tokken = '';
	user.conToken = '';
	user.completed = false;
};

const createUser = async (req, res) => {
    try {
        let user = req.body;
		validator.fieldsExist(user, usersM.registerFields()); // check if user has the required keys to register
        validator.user(user);										// validate user object's values
        userDefaultValues(user);									// default values
        await usersM.userExists(null, user.username, user.email);
        user.password = await bcrypt.hash(user.password, 10);
		let uuid = await usersM.storeUser(user);
        res.status(201).json({uuid: uuid});	// return uuid on success
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

		validator.fieldsExist(user, usersM.loginFields()); // check if user has the required keys to login
		if (err = validator.email(user.email))					//	validate email
			throw { emailError: err };
		let userdb = await usersM.loadBy('email', user.email);	// load user by email if it exists, else throw err
		if (user.password == "" || !user.password || !await bcrypt.compare(user.password, userdb.password))// || userdb.uuid !== req.params.id)
			throw { passwordError: 'Incorrect password.'};

		auth.createConnection(res, userdb.uuid, userdb.username, userdb.email);
		console.log('logged in by server.');
		res.status(200).json( { msg: 'user has logged in', uuid: userdb.uuid } );	// TODO: send JSON web token
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
		auth.deleteConnection(res);
		console.log('loggetout by server.');
		res.status(200).json({ msg: 'user has logged out.' });
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
        let user = await usersM.loadById(req.params.id);
	    delete user.tokken;										// delete secret fields
	    delete user.conToken;
		delete user.password;
		delete user.email;
		user.age = validator.calculateAge(user.birthdateShort);	// calculate age from birthdate
        res.status(200).json(user);
    }
    catch (err) {
        res.status(422).json({error: err.message});
    }
}

const getUsersAll = async (req, res) => {
	try {
		let result = await usersM.loadAll();
		var arr = [];
		result.records.forEach(record => {
		  delete record.get('n').properties.conToken;	// delete secret fields
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

const editUser = async (req, res) => {
	try {
		const id = req.params.id
		const result = await usersM.loadById(id)

		////if conmpleted false
		if(result.records.get('n').properties.completed === false) {
			// valid first time setup data
			const userUpdate = req.body
			validator.fieldsExist(userUpdate, usersM.setupFields());
			validator.setup(userUpdate);
			userUpdate.bio = userUpdate.bio.trim();
			// patch usersM with new data
			// const update = usersM.setupUser()
		}
		res.status(200).send({msg: "user Updated", status: "OK"})
	}
	catch (err) {
		console.log(err);
		res.status(400).send(err)
	}
}

module.exports = {
	create:     createUser,
	getAll:		getUsersAll,
	getById:    getUserById,
	login:		loginUser,
	logout:		logoutUser,
	edit:		editUser,
}

//deleteUser

