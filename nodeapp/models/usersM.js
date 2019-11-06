const db = require ('./db');



const storeUser = async (req, res) => {
  console.log(req.user);
  const cypher = `CREATE (n:user{
    username:{username},
    firstname:{firstname},
    lastname:{lastname},
    email:{email},
    password:{password},
    age:{age},
    score:{score},
    location:{location},
    gender:{gender},
    sexualpreferences:{sexualpreferences},
    biography:{biography},
    pictures:{pictures},
    interests:{interests},
    uuid:{uuid},
    tokken:{tokken},
    conTokken:{conTokken}}) RETURN n`;
  const params = req.user;
    try {
      let result = await db.query(cypher, params);
      res.status(201).json(result);
    }
    catch (err) {
      console.log(err);
      res.status(501).json(err);
    }
}

const loadUsersAll =  async (req, res) => {
  let cypher = 'MATCH (n:user) RETURN n';
  try {
    let result = await db.query(cypher);
    var arr = [];
    result.records.forEach(record => {
      delete record.get('n').properties.password;
      arr.push(record.get('n').properties);
    });
    res.status(200).json(arr);
  }
  catch (err) {
    res.status(501).json(err);
  }
}

const userExists = async (uuid, username, email) => { // by uuid or username && email
  let cypher = (username && email)? `MATCH (n:user)
  WHERE n.email = {email} OR n.username = {username} RETURN n` : `MATCH (n:user)
  WHERE n.uuid = {uuid} RETURN n`;
  try {
    let params = {
      username: username,
      email: email,
      uuid: uuid,
    };
    let result = await db.query(cypher, params);
	  if (result.records.length)
      throw {msg: 'user already exists'};
  }
  catch (err) {
    throw err;
  }
}

const getUserById = async (uuid) => {
	let cypher = `MATCH (n:user) WHERE n.uuid = {uuid} RETURN n`;
	try {
    let params = {uuid: uuid};
    let properties = (await db.query(cypher, params)).records[0].get('n').properties;
    if (!properties)
      throw new Error('User not found.');
    delete properties.password;
    return (properties);
	}
	catch (err) {
	  res.status(404).json({msg: err});
	}
}

const emptyUser = () => {
	return {
			username: null,
			firstname: null,
			lastname: null,
			email: null,
			password: null,
      age: null,
      uuid: null,
			score: null,
			location: null,
			gender: null,
			sexualpreferences: null,
			biography: null,
			pictures: null,
			interests: null,
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
			age: null,
		};
}

module.exports = {
  loadUsersAll : loadUsersAll,
  storeUser : storeUser,
  userExists : userExists,
  createUserFields : createUserFields,
  emptyUser : emptyUser,
  getUserById : getUserById,
};







// var getUsersAllpromise = function (req, res) {

//     session.run('MATCH (n:user) RETURN n')
//     .then(function(result) {
//       res.type('application/json;charset=utf-8');
//       res.status(200);
//       var arr = [];
//       result.records.forEach(function(record) {
//         arr.push(record.get('n'));
//       })
//       session.close();
//       res.send(JSON.stringify(arr));
//     })
//     .catch(function(error) {
//       res.type('text/plain');
//       res.status(501);
//       res.send('ERROR : ' + error);
//     })
// }
