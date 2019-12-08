const express = require('express');
const Router = express.Router();

const conf = require('./config/config');

const usersC = require('./controllers/usersC');
const auth = require('./middlewares/auth');
const baseline = require('./helpers/resetValues');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
});

const upload = multer({ storage: storage });

Router.get('/users/', baseline, usersC.getAll);
Router.get('/users/:id', baseline, usersC.getById);

Router.post('/users/', baseline, usersC.create);

Router.put('/users/:id', baseline, auth.middleware, usersC.isVerifiedLoad, upload.array('pictures', 5), usersC.edit);

Router.post('/session/', baseline, usersC.login);

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