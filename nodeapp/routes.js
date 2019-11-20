const express = require('express');
const authRouter = express.Router();
const openRouter = express.Router();

const usersM = require('./models/usersM');
const usersC = require('./controllers/usersC');
const reqTime = require('./helpers/reqTime');
const auth = require('./controllers/auth');

openRouter.use(reqTime.reqTimeStart);

openRouter.get('/users/', usersC.getUsersAll);
openRouter.get('/users/:id', usersC.getUserById);

openRouter.post('/users/', reqTime.reqTimeLog, usersC.createUser);

openRouter.post('/session/', reqTime.reqTimeLog, usersC.loginUser);

// ToDo : authUser middleware
openRouter.delete('/session/', reqTime.reqTimeLog, auth.middleware, usersC.logoutUser);


openRouter.get('/', (req, res) => {
    res.status(200).send('openRouter : GET');
});

openRouter.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('openRouter : POST');
});

openRouter.use((req, res) => res.status(404).json({msg: '404 router : Resource not found.'}));


module.exports = {
    openRouter : openRouter,
    authRouter : authRouter,
}