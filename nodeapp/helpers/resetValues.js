
const resetValues = (req, res, next) => {

    req.bodyconnectedUser = null;
    req.dbuser = null;
    next();
}

module.exports = resetValues;