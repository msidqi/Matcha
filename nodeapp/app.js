const hostname = '127.0.0.1';
const port = (process.env.PORT || 3000);

const express = require('express');
const app = express();

/*
const db_user = 'neo4j';
const db_passwd = 'neo4j';
const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(db_user, db_passwd));
const session = driver.session();
session
  .run('MERGE (alice:Person {name : {nameParam} }) RETURN alice.name AS name', {
    nameParam: 'Alice'
  })
  .subscribe({
    onNext: function(record) {
      console.log(record.get('name'))
    },
    onCompleted: function() {
      session.close()
    },
    onError: function(error) {
      console.log(error)
    }
  })
 
// or
// the Promise way, where the complete result is collected before we act on it:
session
  .run('MERGE (james:Person {name : {nameParam} }) RETURN james.name AS name', {
    nameParam: 'James'
  })
  .then(function(result) {
    result.records.forEach(function(record) {
      console.log(record.get('name'))
    })
    session.close()
  })
  .catch(function(error) {
    console.log(error)
  })

*/

  

app.get('/', (req, res) => {
  console.log('here');
  res.type('text/plain');
  res.status(200);
  res.send('Hello World!!!!!!!!!!!!!!');
});

app.get('/other', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('Request to /other SUCCESSSSSRS');
});












app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()...');
  else
    console.log(`Listening on port ${port}`);
});
