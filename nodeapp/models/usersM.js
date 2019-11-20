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
		sexualpreferences:{sexualpreferences},
		biography:{biography},
		pictures:{pictures},
		uuid:{uuid},
		tokken:{tokken},
		conTokken:{conTokken}}) RETURN n`;
	const params = user;
	let result = await db.query(cypher, params);
	if (result.records.length === 0)
    	throw new Error ('Could not store user.');
	return(result.records[0].get('n').properties.uuid);
}

const storeJWT = async (uuid, JWT) => {
	const cypher = `MATCH (n:user) 
		WHERE n.uuid = {uuid}
		SET n.conTokken = {conTokken}
		RETURN n`;
   const params = {uuid: uuid, conTokken: JWT};
   let result = await db.query(cypher, params);
   if (result.records.length === 0)
	   throw new Error ('Could not store conTokken.');
   return(true);
}

const deleteJWT = async (uuid) => {
	const cypher = `MATCH (n:user) 
		WHERE n.uuid = {uuid}
		SET n.conTokken = {conTokken}
		RETURN n`;
   const params = {uuid: uuid, conTokken: ''};
   let result = await db.query(cypher, params);
   if (result.records.length === 0)
	   throw new Error ('Could not delete conTokken.');
   return(true);
}

const loadUsersAll =  async () => {
  let cypher = 'MATCH (n:user) RETURN n';
  return await db.query(cypher);
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
    let params = {[`${key}`]: val};
	let result = await db.query(cypher, params);
    if (result.records.length === 0)
      throw {[`${key}Error`]: `No user with that ${key}.`}
    return (result.records[0].get('n').properties);
}

const userSchema = () => {
	return {
			username: null,
			firstname: null,
			lastname: null,
			email: null,
			password: null,
			birthdateShort: null,
  		    uuid: null,
			score: null,
			// location: null,
			// gender: null,
			// sexualpreferences: null,
			biography: null,
			pictures: null,
			// interests: null,
			tokken: null,
			conTokken: null,
		};
}

const createUserFields = () => {
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

module.exports = {
  loadUsersAll:		loadUsersAll,
  storeUser:		storeUser,
  userExists:		userExists,
  createUserFields:	createUserFields,
  loginFields:		loginFields,
  userSchema:		userSchema,
  loadUserById:		loadUserById,
  loadUserBy:		loadUserBy,
  storeJWT:			storeJWT,
  deleteJWT:		deleteJWT,
};
