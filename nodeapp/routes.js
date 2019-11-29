const express = require('express');
const Router = express.Router();

const conf = require('./config/config');

const usersC = require('./controllers/usersC');
const auth = require('./middlewares/auth');


Router.get('/users/', usersC.getAll);
Router.get('/users/:id', usersC.getById);

Router.post('/users/', usersC.create);

Router.patch('/users/:id', auth.middleware, usersC.isVerified, usersC.edit);

Router.post('/session/', usersC.login);

Router.delete('/session/', auth.middleware, usersC.logout);

Router.post('/verification/:id/:token', usersC.verify);









Router.get('/routes/', (req, res) => {
    const apiRoutes = {
        users: {
            post: `${conf.baseUrl}/users/`,
        },
        session: {
            post: `${conf.baseUrl}/session/`,
            delete: `${conf.baseUrl}/session/`,
        },
        shops: {
            get:   `${conf.baseUrl}/shops/`,
            post:  `${conf.baseUrl}/shops/:id`,
        },
    }
    res.status(200).send(apiRoutes);
});

Router.get('/', (req, res) => {
    const text = `<h2>Welcome to Matcha api</h2><br>
    <h4>see available urls through <a target=_blank href="${conf.hostname}:${conf.port}${conf.baseUrl}/routes/">${conf.baseUrl}/routes/</a></h4>`;
    res.status(200).send(text);
});

module.exports = {
    Router : Router,
}