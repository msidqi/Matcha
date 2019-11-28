const express = require('express');
const Router = express.Router();

const usersC = require('./controllers/usersC');
const auth = require('./middlewares/auth');


Router.get('/users/', usersC.getAll);
Router.get('/users/:id', usersC.getById);

Router.post('/users/', usersC.create);

Router.patch('/users/:id', usersC.edit);

Router.post('/session/:id', usersC.login);

// ToDo : authUser middleware
Router.delete('/session/:id', auth.middleware, usersC.logout);


Router.get('/', (req, res) => {
    res.status(200).send('Router : GET');
});

Router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('Router : POST');
});

Router.use((req, res) => res.status(404).json({msg: '404 router : Resource not found.'}));


module.exports = {
    Router : Router,
}