const hostname = '127.0.0.1';
const apiRoot = '/api/v1';
const port = (process.env.PORT || 3000);

const express = require('express');
const app = express();
const authRouter = express.Router();
const openRouter = express.Router();

const user = require('./models/usersM');

// const axios = require('axios');

// const users = await axios.get('https://api.github.com/users');

app.use(express.json());                      // body-parse
app.use(apiRoot+'/public', express.static('public')); // serving static files


app.get(apiRoot+'/', (req, res) => {
  res.type('text/plain')
  .status(200)
  .send('Hello World!!!!!!!!!!!!!!???');
});

app.get(apiRoot+'/users/', user.getUsersAll);

openRouter.route(apiRoot+'/route/')
.get(function (req, res) =>)

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
//   "tokken": ""userController.createUser
// }


// app.post(apiRoot+'/users/', function (req, res, next) {

//   next();
// }, function (req, res) {res.type('text/plain');res.status(200);res.send('hello world')});

// app.post(apiRoot+'users/', user.createUser(req, res));

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
