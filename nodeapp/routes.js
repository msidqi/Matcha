const express = require('express');
const authRouter = express.Router();
const openRouter = express.Router();

const userM = require('./models/usersM');
const userC = require('./controllers/usersC');

openRouter.get('/users/', userM.getUsersAll);
openRouter.post('/users/', userC.createUser, userM.storeUser);

openRouter.get('/', (req, res) => {
    res.status(200).send('openRouter : GET');
});
  
openRouter.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('openRouter : POST');
});

module.exports = {
    openRouter : openRouter,
    authRouter : authRouter,
}