const hostname = '127.0.0.1';
const apiRoot = '/api/v1/';
const port = (process.env.PORT || 3000);

const express = require('express');
const app = express();

// const bodyParser = require('body-parser');

const db_user = 'neo4j';
const db_passwd = 'neo4j';
const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://database', neo4j.auth.basic(db_user, db_passwd));
const session = driver.session();

// the Promise way, where the complete result is collected before we act on it:
// session.run('MATCH (n:Person) RETURN n LIMIT 25')
//   .then(function(result) {
//     result.records.forEach(function(record) {
//       console.log(record.get('n'))
//     })
//     session.close()
//   })
//   .catch(function(error) {
//     console.log(error)
//   })


app.use('/public', express.static('public')); // serving static files
// app.use(bodyParser.json()); // parse data in req.body
app.use(express.json());

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('Hello World!!!!!!!!!!!!!!???');
});

app.get(apiRoot+'users/', (req, res) => {

  session.run('MATCH (n:Person) RETURN n')
  .then(function(result) {
    res.type('application/json;charset=utf-8');
    res.status(200);
    var arr = [];
    result.records.forEach(function(record) {
      arr.push(record.get('n'));
    })
    session.close();
    res.send(JSON.stringify(arr));
  })
  .catch(function(error) {
    res.type('text/plain');
    res.status(501);
    res.send('ERROR : '+ error);
  })
});


// JSON format
// {
//   "firstname":"bob2",
//   "lastname":"tron",
//   "email":"real@email.com",
//   "age":21,
//   "score":0,
//   "location":"new york",
//   "gender":"male",
//   "sexualpreferences":"straight",
//   "biography":"cool story bro",
//   "pictures":["path1", "path2"],
//   "interests":["sport","reddit"],
//   "tokken": ""
// }
app.post(apiRoot+'users/', (req, res) =>{
  console.log(req.body);
    session.run(`CREATE (n:user{
      firstname:{firstname},
      lastname:{lastname},
      email:{email},
      age:{age},
      score:{score},
      location:{location},
      gender:{gender},
      sexualpreferences:{sexualpreferences},
      biography:{biography},
      pictures:{pictures},
      interests:{interests},
      tokken:{tokken}}) RETURN n`, {
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
      })
    .then(function (result){
      res.type('application/json;charset=utf-8');
      res.status(200);
      var arr = [];
      result.records.forEach(function(record) {
        arr.push(record.get('n'));
      })
      session.close();
      res.send(JSON.stringify(arr));
    })
    .catch(function (error){
      res.type('applicatiob/json');
      res.status(501);
      res.send('ERROR : '+ error);
    })
    // res.end();
});






app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()...');
  else
    console.log(`Listening on port ${port}`);
});
