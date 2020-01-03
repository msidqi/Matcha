const validator = require('../helpers/validator');
const usersM = require('../models/usersM');
const tagsM = require('../models/tagsM');
const sexprefM = require('../models/sexprefM');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const auth = require('../middlewares/auth');
const sendMail = require('../helpers/mail');
const conf = require('../config/config');
const { handleError } = require('../helpers/errorHandler');
const { loadImageBase64, loadImageBufferPromise } = require('../helpers/img');

//       add/correct user values before registration 
const userDefaultValues = (user) => {
    user.uuid = uuid();
    user.gender = '';
    user.score = 0.0;
    user.sexpref = '';
    user.bio = '';
	user.pictures = [];
	user.position = '';
    user.token = uuid() + uuid();
	user.conToken = '';
	user.verified = false;
	user.completed = false;
};

const sendVerificationEmail = (email, username, uuid, token) => {
	console.log('NOT sendVerificationEmail ----', email, username, uuid, token);
	if (email === '' || !username || uuid === '' ||token === '')
		throw {msg: 'Missing data: sending verification email.', code: 400};
	console.log('sendVerificationEmail ----');
	const link = `<a target="_blank" href="${conf.viewUrl}/verification/${uuid}/${token}">here</a>`;
	sendMail(email, 'Matcha Verification', `
	Hello there ${username} !

	Please verify your email through ${link}.
	`);
}
//teboxat599@newmail.top
//pahib56949@mail3tech.com
//retikis685@imail5.net ///coalitions
// liketov580@4qmail.com
//figes40902@wmail2.net
// vecoh66618@wmail1.com
// wopos35016@email-9.com female
const createUser = async (req, res, next) => {
    try {
        let user = req.body;
		validator.fieldsExist(user, usersM.registerFields()); // check if user has the required keys to register
        validator.user(user);										// validate user object's values
        userDefaultValues(user);									// default values
        await usersM.userExists(null, user.username, user.email);
		console.log(user);
        user.password = await bcrypt.hash(user.password, 10);
		let uuid = await usersM.storeUser(user);
		sendVerificationEmail(user.email, user.username, user.uuid, user.token);
        res.status(201).json({uuid: uuid});	// return uuid on success
    }
    catch (err) {
		console.log(err);
		next(handleError(422, err));
    }
}

//f40ad3aa-1287-451b-9a1f-7bd92cb144d1
const isVerifiedLoadUser = async (req, res, next) => {
    try {
		if (req.connectedUser) {
			let uuid = req.connectedUser.uuid;
			req.dbuser = await usersM.loadBy('uuid', uuid);
			if (req.dbuser.verified === true)
				next();
			else
				throw {emailError: 'Account not verified.', code: 403};
		}
		else if (req.body.email !== "" && (req.dbuser = await usersM.loadBy('email', req.body.email)).completed === false)
		{
			if (req.dbuser.verified !== true)
				throw {emailError: 'Account not verified.', code: 403};
			next();
		}
		else {
			if (req.body.email === "")
				throw  {emailError: 'field required', code: 422}; // Unauthorized
			else
				throw {msg: 'User not logged in.', code: 401}; // Unauthorized
		}
    }
    catch (err) {
		console.log('HERE+ERR');
		console.log(err);
		let code = (typeof err.code === 'number') ? err.code : 400;
		if (typeof err.msg == 'string')
			next(handleError(code, err.msg));
		else
			next(handleError(code, err));
    }
}

const isCompleted = async (req, res, next) => {
	if (req.dbuser.completed === false)
		next(handleError(422, 'Account setup not completed.'));
	else
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
				throw {msg: 'Invalid token.', code: 401}; // Unauthorized
			await usersM.updateVerify(uuid);
			res.status(201).json({msg: 'user is now verified.', status: "OK"});
		}
    }
    catch (err) {
		let code = (typeof err.code === 'number') ? err.code : 400;
		if (typeof err.msg == 'string')
			next(handleError(code, err.msg));
		else
			next(handleError(code, err));
    }
}

const loginUser = async (req, res, next) => {
	try {
		let user = req.body;
		let dbuser = req.dbuser;
		let err = "";

		validator.fieldsExist(user, usersM.loginFields()); // check if user has the required keys to login
		if (err = validator.email(user.email))					//	validate email
			throw { emailError: err , code: 422};
		// let userdb = await usersM.loadBy('email', user.email);	// load user by email if it exists, else throw err
		if (user.password == "" || !user.password || !await bcrypt.compare(user.password, dbuser.password))// || userdb.uuid !== req.params.id)
			throw { passwordError: 'Incorrect password.', code: 422};
		auth.createConnection(res, dbuser.uuid, dbuser.username, dbuser.email);
		res.status(200).json( { msg: 'user has logged in', uuid: dbuser.uuid, verified: dbuser.verified, completed: dbuser.completed, username: dbuser.username } );	// TODO: send JSON web token
	}
	catch (err) {
		let code = (typeof err.code === 'number') ? err.code : 400;
		if (typeof err.msg == 'string')
			next(handleError(code, err.msg));
		else
			next(handleError(code, err));
	}
}

const logoutUser = async (req, res, next) => {
	// try {
		auth.deleteConnection(res);
		console.log('loggetout by server.');
		res.status(200).json({ msg: 'user has logged out.' });
	// }
	// catch (err) {
	// 	next(handleError(400, err));
	// }
}

/*
MATCH (n:user) WHERE n.uuid = '456d694e-9749-41c0-98ff-e2702c3cd004' RETURN {username: n.username,uuid: n.uuid} AS n;
*/
const getUserById = async (req, res, next) => {
    try {
        let user = await usersM.loadById(req.params.id);
	    delete user.token;										// delete secret fields
	    delete user.conToken;
		delete user.password;
		delete user.email;
		user.age = validator.calculateAge(user.birthdateShort);	// calculate age from birthdate
		// console.log( (await Promise.all(user.pictures.map(picPath => loadImageBufferPromise(picPath)))).map( picBuffer => picBuffer.toString('base64') ) );
		// user.pictures = (await Promise.all(user.pictures.map(picPath => loadImageBufferPromise(picPath)))).map( picBuffer => `data:image/png;base64,${picBuffer.toString('base64')}` );
        res.status(200).json(user);
    }
    catch (err) {
        next(handleError(500, err));
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
			user.age = validator.calculateAge(user.birthdateShort);
			// user.pictures = (await Promise.all(user.pictures.map(picPath => loadImageBufferPromise(picPath)))).map( picBuffer => `data:image/png;base64,${picBuffer.toString('base64')}` );
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

		console.log('err111');
		let updateable = usersM.updateableFields(); // take only user fields that are allowed to change
		for (const key in updateable) {
			if (req.body[key])
				userUpdate[key] = req.body[key];
		}
		if(!user.completed) {
			userUpdate.pictures = req.files;
			validator.fieldsExist(userUpdate, usersM.setupFields());
			validator.setup(userUpdate);
			// if (validator.tags(userUpdate.tags))
			userUpdate.longitude = parseInt(userUpdate.position[0]);
			userUpdate.latitude = parseInt(userUpdate.position[1]);
			console.log('userUpdate:--->', userUpdate);
			userUpdate.pictures = userUpdate.pictures.map( picture => `${picture.filename}` );	// ${process.cwd()}/uploads/
			userUpdate.completed = true;		// patch usersM with new data && set completed === true
			await sexprefM.storeSexpref(user, userUpdate.sexpref);
			await tagsM.storeTagsLike(user, userUpdate.tags);
			delete userUpdate.position;
			delete userUpdate.sexpref;
			delete userUpdate.tags;
		} else {
			console.log('COMPLETED');
			let tovalidate = '';
			for (const key in userUpdate) {
				if (userUpdate.hasOwnProperty(key))
				tovalidate += (tovalidate === '') ? `${key}` : ` ${key}`;
			}
			validator.userInfo(tovalidate , userUpdate);
		}
		if (typeof userUpdate.bio === 'string')
			userUpdate.bio = userUpdate.bio.trim();
		console.log(userUpdate);
		usersM.update(user.uuid , userUpdate);
		res.status(200).send({msg: "user updated", status: "OK"});
	}
	catch (err) {
		console.log(err);
		next(handleError(422, err));
	}
}

const distanceBetweenTwoUsers = () => {
	const cypher = `WITH
	point({ x: {longitude-0}, y: {latitude-0}, z: {altitude-0}, crs: 'wgs-84-3d' }) AS p1,7
	point({ x: {longitude-1}, y: {latitude-1}, z: {altitude-1}, crs: 'wgs-84-3d' }) AS p2
	RETURN distance(p1,p2) AS dist`
}

const locationRefresh = (req, res, next) => {

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
	locationRefresh:	locationRefresh,
}

//deleteUser
