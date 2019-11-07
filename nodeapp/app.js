const hostname = '127.0.0.1';
const apiPrefix = '/api/v1';
const port = (process.env.PORT || 3000);
// const axios = require('axios');
// const users = await axios.get('https://api.github.com/users');
const express = require('express');
const app = express();


const userM = require('./models/usersM');
const routes = require('./routes');


app.use(express.json());                                  // body-parse
app.use(`${apiPrefix}/public`, express.static('public')); // serving static files

app.use(apiPrefix, routes.openRouter);

app.use((req, res) => res.status(404).json({msg: '404 app : Resource not found.'}));


app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()... ' + err);
  else
    console.log(`Listening on port ${port}`);
});  
