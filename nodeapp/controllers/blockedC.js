const validator = require('../helpers/validator');
const blockedM = require('../models/blockedM');
const { handleError } = require('../helpers/errorHandler');

const blockUser = async (req, res, next) => {
    try {
        if (!req.body.uuid || typeof req.body.uuid !== 'string')
          throw {msg: 'Missing required information: [uuid]', code: 422};
        let ret = await blockedM.storeBlock(req.dbuser, req.body.uuid );
        res.status(201).json({msg: ret.msg});
    }
    catch (err) {
      console.log(err);
      next(handleError(err.code, err.msg));
    }
}

const unblockUser = async (req, res, next) => {
  try {
      if (!req.body.uuid || typeof req.body.uuid !== 'string')
        throw {msg: 'Missing required information: [uuid]', code: 422};
      let ret = await blockedM.deleteBlock(req.dbuser, req.body.uuid );
      res.status(202).json({msg: ret.msg});
  }
  catch (err) {
    console.log(err);
    next(handleError(err.code, err.msg));
  }
}

const getBlockedAll = async (req, res, next) => {
  try {
      let ret = await blockedM.loadBlocked(req.dbuser.uuid);
        ret = ret.map((user) => {
        user = user.get('ret')
        user.age = validator.calculateAge(user.birthdateShort);
        return (user);
      });
    res.status(202).json(ret);
  }
  catch (err) {
    console.log(err);
    next(handleError(err.code, err.msg));
  }
}

module.exports = {
	block:      blockUser,
  unblock:    unblockUser,
  getAll:     getBlockedAll
}
