const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const auth = require('../middlewares/auth');
const sendMail = require('../helpers/mail');
const conf = require('../config/config');
const { handleError } = require('../helpers/errorHandler');

//       add/correct user values before registration 
const userDefaultValues = (user) => {
    user.uuid = uuid();
    user.gender = '';
    user.score = 0;
    user.sexualpreferences = '';
    user.biography = '';
	user.pictures = [];
    user.token = uuid() + uuid();
	user.conToken = '';
	user.verified = false;
	user.completed = false;
};

const sendVerificationEmail = (email, username, uuid, token) => {
	console.log(conf.viewUrl);
	const link = `<a target="_blank" href="${conf.viewUrl}/verification/${uuid}/${token}">here</a>`;
	sendMail(email, 'Matcha Verification', `
	Hello there ${username} !

	Please verify your email through ${link}.
	`);
}
//teboxat599@newmail.top
const createUser = async (req, res, next) => {
    try {
        let user = req.body;
		console.log(user);
		validator.fieldsExist(user, usersM.registerFields()); // check if user has the required keys to register
        validator.user(user);										// validate user object's values
        userDefaultValues(user);									// default values
        await usersM.userExists(null, user.username, user.email);
        user.password = await bcrypt.hash(user.password, 10);
		let uuid = await usersM.storeUser(user);
		sendVerificationEmail(user.email, user.username, user.uuid, user.token);
        res.status(201).json({uuid: uuid});	// return uuid on success
    }
    catch (err) {
		next(handleError(422, err));
    }
}
//f40ad3aa-1287-451b-9a1f-7bd92cb144d1
const isVerifiedLoadUser = async (req, res, next) => {
    try {
		let uuid = req.connectedUser.uuid;
		req.dbuser = await usersM.loadBy('uuid', uuid);
		if (req.dbuser.verified === true)
	        next();
		else
			throw 'Account not verified.';
    }
    catch (err) {
		console.log('HERE+ERR');
		next(handleError(422, err));
    }
}

const isCompleted = async (req, res, next) => {
	if (req.dbuser.completed === false)
		next(handleError(422, 'Account setup not completed.'));
	next();
}

const verifyUserEmail = async (req, res, next) => {
    try {
		let uuid = req.params.id;
		let token = req.params.token;
		let user = await usersM.loadBy('uuid', uuid);
		if (user.verified === true)
	        res.status(201).json({msg: 'user verified.',  status: "OK"});
		else {
			if (user.token !== token)
				throw new Error('Invalid token.');
			await usersM.updateVerify(uuid);
			res.status(201).json({msg: 'user is now verified.', status: "OK"});
		}
    }
    catch (err) {
		next(handleError(422, err));
    }
}

const loginUser = async (req, res, next) => {
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
		console.log('logged in by server.', userdb);
		res.status(200).json( { msg: 'user has logged in', uuid: userdb.uuid, verified: userdb.verified, completed: userdb.completed, username: userdb.username } );	// TODO: send JSON web token
	}
	catch (err) {
		next(handleError(422, err));
	}
}

const logoutUser = async (req, res, next) => {
	try {
		auth.deleteConnection(res);
		console.log('loggetout by server.');
		res.status(200).json({ msg: 'user has logged out.' });
	}
	catch (err) {
		next(handleError(422, err));
	}
}

const getUserById = async (req, res, next) => {
    try {
        let user = await usersM.loadById(req.params.id);
	    delete user.token;										// delete secret fields
	    delete user.conToken;
		delete user.password;
		delete user.email;
		user.age = validator.calculateAge(user.birthdateShort);	// calculate age from birthdate
        res.status(200).json(user);
    }
    catch (err) {
        next(handleError(422, err));
    }
}

const getUsersAll = async (req, res, next) => {
	try {
		let result = await usersM.loadAll();
		var arr = [];
		result.records.forEach(record => {
			let user = record.get('n').properties;
		  	delete user.conToken;	// delete secret fields
		  	delete user.token;
		  	delete user.password;
		  	delete user.email;
		  	arr.push(user);
		});
		res.status(200).json(arr);
	  }
	  catch (err) {
		next(handleError(501, err));
	  }
}

const editUser = async (req, res, next) => {
	try {
		const user = req.dbuser;
		let userUpdate = {};

		// console.log('err111');
		let updateable = usersM.updateableFields(); // take only user fields that are allowed to change
		for (const key in updateable) {
			if (updateable.hasOwnProperty(key) && req.body[key])
					userUpdate[key] = req.body[key];
		}
		if(!user.completed) {
			console.log('NOT COMPLETED');
			userUpdate.pictures = req.files;
			validator.fieldsExist(userUpdate, usersM.setupFields());
			validator.setup(userUpdate);
			// userUpdate.completed = true;		// patch usersM with new data && set completed === true
		}
		else {
			console.log('COMPLETED');
			let tovalidate = '';
			for (const key in userUpdate) {
				if (userUpdate.hasOwnProperty(key))
				tovalidate += (tovalidate === '') ? `${key}` : ` ${key}`;;
			}
			validator.userInfo(tovalidate , userUpdate);
		}
		if (typeof userUpdate.bio === 'string')
			userUpdate.bio = userUpdate.bio.trim();
		console.log(req.body.photos);
		console.log(userUpdate);
		// usersM.update(user.uuid , userUpdate)
		res.status(200).send({msg: "user updated", status: "OK"});
	}
	catch (err) {
		console.log(err);
		next(handleError(422, err));
	}
}

module.exports = {
	verify:				verifyUserEmail,
	isVerifiedLoad:		isVerifiedLoadUser,
	isCompleted:		isCompleted,
	create:     		createUser,
	getAll:				getUsersAll,
	getById:    		getUserById,
	login:				loginUser,
	logout:				logoutUser,
	edit:				editUser,
}

//deleteUser

