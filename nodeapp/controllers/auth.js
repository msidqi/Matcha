const createJWT = (uuid) => {
	const JWTplaceholder = `header.${uuid}+{username}.signature`;

	return JWTplaceholder;
}

const verifyJWT = (JWT, uuid) => {
	// get JWT from cookie
	const JWTplaceholder = `header.${uuid}+{username}.signature`;
	
	if (JWTplaceholder !== JWT)
		return (true)
	return (false);
}

// const middleware = (req, res, next) => {
// 	let data = req.body;

// 	if (!data || !data.conTokken || !data.uuid || !verifyJWT(data.conTokken, data.uuid))
// 		throw new Error('Invalid JWT');
// 	next();
// }


const middleware = (req, res, next) => {
	let data = req.body;
	let JWT = req.cookies.JWT;
	console.log('middleware JWT: ', JWT);

	if (!JWT || !data || !data.uuid || !verifyJWT(JWT, data.uuid))
		throw new Error('Invalid  or missing JWT.');
	next();
}

module.exports = {
	createJWT:		createJWT,
	verifyJWT:		verifyJWT,
	middleware:		middleware,
}