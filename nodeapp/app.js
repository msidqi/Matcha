const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://username:password@localhost:7474');

const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = (process.env.PORT || 3000);

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
    console.log('Mongodb created');
    db.close();
});


app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!!!!!!!!!!!!!!');
});

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
});
