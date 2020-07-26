if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const conf = require('./config/config');
const port = (process.env.PORT || conf.port);
const cors = require('cors');
const routes = require('./routes');
const cookieParse = require('cookie-parser');
const { errorMiddleware } = require('./helpers/errorHandler');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(cookieParse());                                   // {credentials: true, origin: 'http://localhost:3000'}
app.use(cors());								                          // to add : whitelist options
app.use(express.json());                                  // body-parse
app.use(`${conf.baseUrl}/public`, express.static('public')); // serving static files

app.use(conf.baseUrl, routes.Router);

app.use((req, res) => res.status(404).json({msg: '404 app : Resource not found.'})); // target url not found

app.use( errorMiddleware ); // catching middlewares errors


io.on('connection', (socket) => {
  console.log('Client connected...');
  socket.emit('news', { test: 'hello world' });
  socket.on('clie', (data) => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('disconnected...');
  });
});

// use server.listen() instead of app.listen() in order to use socketIo
server.listen(port, (err) => {
  if (err)
    console.error('error in server.listen()... ' + err);
  else
    console.log(`Listening on port ${port}`);
});