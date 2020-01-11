const db = require ('../helpers/db');


const storeUser = async (user) => {
 	const cypher = `CREATE (n:user{
		username:{username},
		firstname:{firstname},
		lastname:{lastname},
		email:{email},
		password:{password},
		birthdateShort:{birthdateShort},
		score:{score},
		gender:{gender},
		sexpref:{sexpref},
		bio:{bio},
		pictures:{pictures},
		uuid:{uuid},
		token:{token},
		conToken:{conToken},
		verified:{verified},
		completed: {completed}
		}) RETURN n`;
	const params = user;
	console.log(params, cypher)
	let result = await db.query(cypher, params);
	if (result.records.length === 0)
    	throw new Error ('Could not store user.');
	return(result.records[0].get('n').properties.uuid);
}

const storeJWT = async (uuid, JWT) => {
	const cypher = `MATCH (n:user) 
		WHERE n.uuid = {uuid}
		SET n.conToken = {conToken}
		RETURN n`;
   const params = {uuid: uuid, conToken: JWT};
   let result = await db.query(cypher, params);
   if (result.records.length === 0)
	   throw new Error ('Could not store conToken.');
   return(true);
}

const deleteJWT = async (uuid) => {
	let cypher = `MATCH (n:user) 
		WHERE n.uuid = {uuid}
		SET n.conToken = {conToken}
		RETURN n`;
   let params = {uuid: uuid, conToken: ''};
   let result = await db.query(cypher, params);
   if (result.records.length === 0)
	   throw new Error ('Could not delete conToken.');
   return(true);
}

const loadUsersAll =  async (uuid) => {
	let cypher = `MATCH (sx2:sexpref)<-[r3:SEXPREF]-(m:user)-[r2:INTERESTED_IN]->(t:tag)<-[r1:INTERESTED_IN]-(n:user {uuid: {uuid}})-[r0:SEXPREF]->(sx1:sexpref)
	WHERE m.gender = sx1.type AND sx2.type = n.gender AND m.uuid <> n.uuid AND NOT (n)-[:BLOCKS]-(m)
	WITH {user:m, numOfTags: COUNT(DISTINCT t)} AS n
	RETURN DISTINCT n ORDER BY n.numOfTags DESC, n.user.score DESC`;
	let params = {uuid: uuid};
	return await db.query(cypher, params);
}

const updateVerify =  async (uuid) => {
	let cypher = "MATCH (n:user {uuid: {uuid}}) SET n.verified = true, n.token = '' RETURN n.verified";
	let params = {uuid: uuid};

	let result = await db.query(cypher, params);
	console.log(result);
}

const updateUser =  async (uuid, userUpdates) => {
	let set = '';
	let first = true;
	let comma = ''
	for (const key in userUpdates) {
		if (key === 'position')
			set += `${comma} n.position = point({ x: {longitude}, y: {latitude}, z: 0, crs: 'wgs-84-3d' }) `;
		else
			set += `${comma} n.${key} = {${key}} `;
		if (!comma)
			comma = ', ';
	}
	let cypher = `MATCH (n:user {uuid: {uuid}}) SET ${set} RETURN n`;
	let params = {uuid: uuid, ...userUpdates};
	if (typeof userUpdates.position !== 'undefined') {
		params.longitude = userUpdates.position[0];
		params.latitude = userUpdates.position[1];
	}
	let result = await db.query(cypher, params);
	console.log(result.records[0].get('n').properties);
}
 
const userExists = async (uuid, username, email) => { // by uuid or username && email
  let cypher = (username && email)? `MATCH (n:user)
  WHERE n.email = {email} OR n.username = {username} RETURN n` : `MATCH (n:user)
  WHERE n.uuid = {uuid} RETURN n`;
  let params = {
	username: username,
	email: email,
	uuid: uuid,
  };
  let result = await db.query(cypher, params);
	if (result.records.length){
		let err;
		if (username && email) {
			err = {
				emailError: (result.records[0].get('n').properties.email !== email) ? "" : "email exists.",
				usernameError: (result.records[0].get('n').properties.username !== username) ? "" : "username exists.",
			}
		} else {
			err = `uuid already exists : ${result.records[0].get('n').properties.uuid}.`;
		}
		throw err;
	}
	return (false);
}

const loadUserById = async (uuid) => {
	let cypher = `MATCH (n:user) WHERE n.uuid = {uuid} RETURN n`;
    let params = {uuid: uuid};
	let result = await db.query(cypher, params);
    if (result.records.length === 0)
      throw new Error('No user with that Id.');
    return (result.records[0].get('n').properties);
}

const loadUserBy = async (key, val) => {
	let cypher = `MATCH (n:user) WHERE n.${key} = {${key}} RETURN n`;
	// console.log(cypher);
    let params = {[`${key}`]: val};
	let result = await db.query(cypher, params);
    if (result.records.length === 0)
      throw {[`${key}Error`]: `No user with that ${key}.`}
    return (result.records[0].get('n').properties);
}

const registerFields = () => {
	return {
			username: null,
			firstname: null,
			lastname: null,
			email: null,
			birthdateShort: null,
			password: null,
		};
}

const loginFields = () => {
	return {
			email: null,
			password: null,
		};
}

const setupFields = () => {
	return {
			gender: null,
			sexpref: null,
			tags: null,
			position: null,
			bio: null,
			pictures: null,
			picIndex: null,
	};
}

const updateableFields = () => { // updateableFieldsSetup
	return {
		username: null,
		firstname: null,
		lastname: null,
		// email: null,
		birthdateShort: null,
		password: null,
		gender: null,
		position: null,
		sexpref: null,
		tags: null,
		bio: null,
		pictures: null,
		picIndex: null,
	};
}

const publicFields = () => { // updateableFieldsSetup
	return {
		username: null,
		firstname: null,
		lastname: null,
		birthdateShort: null,
		gender: null,
		position: null,
		sexpref: null,
		tags: null,
		bio: null,
		pictures: null,
		picIndex: null,
	};
}

module.exports = {
  loadAll:			loadUsersAll,
  storeUser:		storeUser,
  userExists:		userExists,
  registerFields:	registerFields,
  loginFields:		loginFields,
  loadById:			loadUserById,
  loadBy:			loadUserBy,
  storeJWT:			storeJWT,
  deleteJWT:		deleteJWT,
  setupFields: 		setupFields,
  updateVerify:		updateVerify,
  update:			updateUser,
  updateableFields:	updateableFields,
  publicFields:		publicFields,
};
