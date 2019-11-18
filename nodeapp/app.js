const conf = require('./config/config');
const port = (process.env.PORT || conf.port);

const express = require('express');
const app = express();

const cors = require('cors');

const userM = require('./models/usersM');
const routes = require('./routes');

app.use(cors());								// to add : whitelist options
app.use(express.json());                                  // body-parse
app.use(`${conf.baseUrl}/public`, express.static('public')); // serving static files

app.use(conf.baseUrl, routes.openRouter);

app.use((req, res) => res.status(404).json({msg: '404 app : Resource not found.'}));


app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()... ' + err);
  else
    console.log(`Listening on port ${port}`);
});  
