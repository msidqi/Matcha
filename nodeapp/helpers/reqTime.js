
const reqTimeStart = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

const reqTimeStartLog = (req, res, next) => {
    console.log('Requested at: ' + req.requestTime);
    next();
}

const reqTimeLog = (req, res, next) => {
    console.log('Request took: ' + (Date.now() - req.requestTime));
    next();
}

module.exports = {
    reqTimeLog:      reqTimeLog,
    reqTimeStart:    reqTimeStart,
    reqTimeStartLog: reqTimeStartLog
};