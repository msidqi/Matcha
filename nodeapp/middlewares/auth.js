const jwt = require('jsonwebtoken');
var fs = require('fs');

const createConnection = (res, uuid) => {
	let private_key;
	let options;
	let conToken;
	let payload;

	payload = {uuid: uuid}
	options = { algorithm: 'RS256' };
	private_key= fs.readFileSync(__dirname + '/keys.pem').toString();
	conToken = jwt.sign(payload, private_key, options);
	res.cookie('conToken', conToken, { httpOnly: true });
}

const deleteConnection = (res) => {
	res.clearCookie('conToken', { httpOnly: true });
}

const verifyConnection = (userData, conToken) => {
	let ret;
	let public_key;
	let options;

	options = { algorithms: ['RS256'] };
	public_key = fs.readFileSync(__dirname + '/keys.pem.pub').toString();
	ret = jwt.verify(conToken, public_key, options);
	if (ret && userData.uuid === ret.uuid)
		return (true);
	return (false);
}

const middleware = (req, res, next) => {
	let uuid = req.params.id;
	let conToken = req.cookies.conToken;
	console.log('middleware JWT: ', conToken);

	if (!conToken || !uuid || !verifyConnection({uuid: uuid}, conToken))
		throw new Error('Invalid or missing JWT.');
	next();
}

module.exports = {
	createConnection:		createConnection,
	verifyConnection:		verifyConnection,
	deleteConnection:		deleteConnection,
	middleware:				middleware,
}