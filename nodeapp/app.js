const hostname = '127.0.0.1';
const port = (process.env.PORT || 3000);

const express = require('express');
const app = express();


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
  

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('Hello World!!!!!!!!!!!!!!');
});

app.get('/api/users', (req, res) => {

  
  session.run('MATCH (n:Person) RETURN n')
  .then(function(result) {
    res.type('json');
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





app.get('addUser', (req, res) =>{
    
    session.run('CREATE')
    .then(function (result){

    })
    .catch(function (error){
      res.type('text/plain');
      res.status(501);
      res.send('ERROR : '+ error);
    })
});






app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()...');
  else
    console.log(`Listening on port ${port}`);
});
