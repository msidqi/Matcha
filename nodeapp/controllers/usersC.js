const validator = require('../helpers/validator');


const createUser = (req, res, next) => {
    try {
        console.log('JSOOON');
        validator.user(req.body);
        next();
    }
    catch (err) {
        res.status(422).json({ error: err });
    }
}








module.exports = {
    createUser : createUser,
}

//creatUSer
//deleteUser