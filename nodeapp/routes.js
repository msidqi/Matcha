const express = require('express');
const Router = express.Router();

const conf = require('./config/config');

const imageC = require('./controllers/imageC');
const usersC = require('./controllers/usersC');
const matchesC = require('./controllers/matchesC');
const blockedC = require('./controllers/blockedC');
const auth = require('./middlewares/auth');
const baseline = require('./helpers/resetValues');
const tagsM = require('./models/tagsM');
const upload = require('./helpers/multer');


Router.get('/users/suggestions', baseline, auth.middleware, usersC.isVerifiedLoad, usersC.getAll);

Router.post('/users/matches', baseline, auth.middleware, usersC.isVerifiedLoad, matchesC.match);

Router.delete('/users/matches', baseline, auth.middleware, usersC.isVerifiedLoad, matchesC.unmatch);

Router.get('/users/blocked', baseline, auth.middleware, usersC.isVerifiedLoad, blockedC.getAll);

Router.post('/users/blocked', baseline, auth.middleware, usersC.isVerifiedLoad, blockedC.block);

Router.delete('/users/blocked', baseline, auth.middleware, usersC.isVerifiedLoad, blockedC.unblock);

// Router.get('/users/', baseline, usersC.getAll); // query males | females | both | limits=3/page |

Router.get('/users/', baseline, auth.middleware, usersC.isVerifiedLoad, usersC.getAll); // for admin

Router.get('/users/:id', baseline, auth.middleware, usersC.getById);

Router.post('/users/', baseline, usersC.create);

Router.put('/users/:id', baseline, auth.middleware, usersC.isVerifiedLoad, upload.array('pictures', 5), usersC.edit);

Router.patch('/users/:id/location', baseline, auth.middleware, usersC.isVerifiedLoad, usersC.isCompleted, usersC.locationRefresh);

Router.post('/session/', baseline, /*usersC.isVerifiedLoad,*/ usersC.login);

Router.get('/images/:imageName', baseline, auth.middleware, usersC.isVerifiedLoad, imageC.load);

Router.delete('/session/', baseline, /*auth.middleware,*/ usersC.logout);
// Router.delete('/session/', baseline, auth.middleware, usersC.isVerifiedLoad, usersC.logout);

Router.post('/verification/:id/:token', baseline, usersC.verify);









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