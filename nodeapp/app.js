if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const conf = require('./config/config');
const port = (process.env.PORT || conf.port);
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const cookieParse = require('cookie-parser');

app.use(cookieParse());
app.use(cors());								// to add : whitelist options
app.use(express.json());                                  // body-parse
app.use(`${conf.baseUrl}/public`, express.static('public')); // serving static files

app.use(conf.baseUrl, routes.Router);

app.use((req, res) => res.status(404).json({msg: '404 app : Resource not found.'}));


app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()... ' + err);
  else
    console.log(`Listening on port ${port}`);
});  
