const jwt = require('jsonwebtoken');
const fs = require('fs');
const { handleError } = require('../helpers/errorHandler');

const createConnection = (res, uuid, username, email) => {
	let private_key;
	let options;
	let conToken;
	let payload;

	payload = {uuid: uuid, username: username, email: email}
	options = { algorithm: 'RS256' };
	private_key= fs.readFileSync(__dirname + '/keys.pem').toString();
	conToken = jwt.sign(payload, private_key, options);
	res.cookie('conToken', conToken, { expires: new Date(Date.now() + 5000000), httpOnly: true });
}

const deleteConnection = (res) => {
	res.clearCookie('conToken', { httpOnly: true });
}

const verifyConnection = (conToken) => {
	let ret;
	let public_key;
	let options;

	options = { algorithms: ['RS256'] };
	public_key = fs.readFileSync(__dirname + '/keys.pem.pub').toString();
	try {
		if (ret = jwt.verify(conToken, public_key, options))
			return (ret);
	}
	catch (err) {
		return (false);
	}
	return (false);
}

const middleware = (req, res, next) => {
	let conToken = req.cookies.conToken;
	// console.log('Msidqi321@gmail.com', conToken);

	if (!conToken || !(req.verifiedUser = verifyConnection(conToken)))
		next(handleError(400, 'Invalid or missing token.'));
	next();
}
//users/f40ad3aa-1287-451b-9a1f-7bd92cb144d1
module.exports = {
	createConnection:		createConnection,
	verifyConnection:		verifyConnection,
	deleteConnection:		deleteConnection,
	middleware:				middleware,
}