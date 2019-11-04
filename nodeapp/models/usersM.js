const db = require ('./db');

var storeUser = async (req, res) => {
  console.log(req.body);
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
    tokken:{tokken}}) RETURN n`;
  const params = {
    username: req.body.username,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password: req.body.password,
    age : req.body.age,
    score : req.body.score,
    location : req.body.location,
    gender : req.body.gender,
    sexualpreferences : req.body.sexualpreferences,
    biography : req.body.biography,
    pictures : req.body.pictures,
    interests : req.body.interests,
    tokken : req.body.tokken
  };

    try {
      let result = await db.query(cypher, params);
      res.status(201).send(result);
    }
    catch (err) {
      console.log(err);
      res.status(501).send(err);
    }
}

let getUsersAll =  async (req, res) => {
  let cypher = 'MATCH (n:user) RETURN n';
  try {
    let result = await db.query(cypher);
    var arr = [];
    result.records.forEach((record) => arr.push(record.get('n')));
    res.status(200).send(JSON.stringify(arr));
  }
  catch (err) {
    res.status(501).send(err);
  }
}

// query if username already exists
// if ((err = userM.userExists(userName) ? "" : "Username already exists.") !== "")
//     return (err);

let userExists = async (req, res, next) => {
  let cypher = "MATCH (n:user) WHERE n.username = '' RETURN n";
  try {
    let result = await db.query(cypher);
    next();
  }
  catch (err) {
    throw err;
  }
}




module.exports = {
  getUsersAll : getUsersAll,
  storeUser : storeUser,
  userExists : userExists,
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