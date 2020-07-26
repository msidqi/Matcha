const matchesM = require('../models/matchesM');
const { handleError } = require('../helpers/errorHandler');

const matchUser = async (req, res, next) => {
    try {
        if (!req.body.uuid || typeof req.body.uuid !== 'string')
          throw {msg: 'Missing required information: [uuid]', code: 422};
        let ret = await matchesM.storeMatch(req.dbuser, req.body.uuid);
        res.status(201).json({msg: ret.msg});
    }
    catch (err) {
      console.log(err);
      next(handleError(err.code, err.msg));
    }
}

const unmatchUser = async (req, res, next) => {
  try {
    // console.log('req.body.uuid', req.body.uuid);
      if (!req.body.uuid || typeof req.body.uuid !== 'string')
        throw {msg: 'Missing required information: [uuid]', code: 422};
      let ret = await matchesM.deleteMatch(req.dbuser, req.body.uuid);
      res.status(202).json({msg: ret.msg});
  }
  catch (err) {
    console.log(err);
    next(handleError(err.code, err.msg));
  }
}

module.exports = {
	match:     		matchUser,
	unmatch:      unmatchUser,
}
