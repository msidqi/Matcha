const express = require('express');
const authRouter = express.Router();
const openRouter = express.Router();

const userM = require('./models/usersM');
const userC = require('./controllers/usersC');
const reqTime = require('./helpers/reqTime');

openRouter.use(reqTime.reqTimeStart);

openRouter.get('/users/', userC.getUsersAll);
openRouter.get('/users/:id', userC.getUserById);

openRouter.post('/users/', reqTime.reqTimeLog, userC.createUser);

openRouter.post('/session/', reqTime.reqTimeLog, userC.loginUser);

// ToDo : authUser middleware
// openRouter.delete('/session/', reqTime.reqTimeLog, authUser ,userC.logoutUser);


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