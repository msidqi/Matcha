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

// change request going to /api to another server/port
// var proxy = require('http-proxy-middleware');
// app.use( `/api`, proxy({ target: 'http://localhost', changeOrigin: true }));

app.use(cookieParse());
// {credentials: true, origin: 'http://localhost:3000'}
app.use(cors());								                          // to add : whitelist options
app.use(express.json());                                  // body-parse
app.use(`${conf.baseUrl}/public`, express.static('public')); // serving static files

app.use(conf.baseUrl, routes.Router);

// target url not found
app.use((req, res) => res.status(404).json({msg: '404 app : Resource not found.'}));

// catching middlewares errors
app.use((err, req, res, next) => {
  if (typeof err.message === 'string')
    res.status(432).json({ error: err.message });
else
    res.status(400).json({ errors: err });
});


app.listen(port, (err) => {
  if (err)
    console.error('error in app.listen()... ' + err);
  else
    console.log(`Listening on port ${port}`);
});  
