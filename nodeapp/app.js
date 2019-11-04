const hostname = '127.0.0.1';
const apiPrefix = '/api/v1';
const port = (process.env.PORT || 3000);

const express = require('express');
const app = express();


const userM = require('./models/usersM');
const routes = require('./routes');

// const axios = require('axios');
// const users = await axios.get('https://api.github.com/users');

app.use(express.json());                                  // body-parse
app.use(`${apiPrefix}/public`, express.static('public')); // serving static files

app.use(apiPrefix, routes.openRouter);


// app.post(`${apiPrefix}/users/`, userM.createUser);



// app.post(apiPrefix+'/users/', function (req, res, next) {

//   next();
// }, function (req, res) {res.type('text/plain');res.status(200);res.send('hello world')});

// app.post(apiPrefix+'users/', user.createUser(req, res));

try {
  app.listen(port, (err) => {
    if (err)
      console.error('error in app.listen()... ' + err);
    else
      console.log(`Listening on port ${port}`);
  });  
}
catch (err) {
  console.log('catch err : ' + err);
}
