const db = require ('./db');

var createUser = function (req, res)  {
  const cypher = `CREATE (n:user{
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
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
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
      let result = db.query(cypher, params);
      res.status(201).send(result);
    }
    catch (err) {
      res.status(501).send(error);
    }
}



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

let getUsersAll =  async function (req, res) {
  let cypher = 'MATCH (n:user) RETURN n';
  try {
    let result = await db.query(cypher);
    // res.type('application/json;charset=utf-8');
    res.status(200);
    var arr = [];
    result.records.forEach((record) => arr.push(record.get('n')));
    res.send(JSON.stringify(arr));
  }
  catch (err) {
    res.status(501).send(err);
  }
}

module.exports = {
  getUsersAll : getUsersAll,
  createUser : createUser
};