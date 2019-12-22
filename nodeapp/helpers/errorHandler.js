
const multerErrHandler = function (err, res) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE')
        res.status(415).json({ error: "Exceeded allowed number of files." });
    else
        res.status(415).json({ error: 'Unsupported file format.' });
}

const handleError = (code, err) => {
    if (typeof err === 'string')
        return ({ status: code, value: {error: err} });
    return ({ status: code, value: {errors: err} });
}

const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'MulterError')
        multerErrHandler(err, res);
    else if (!err.status) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error.'});
    }
    else
        res.status(err.status).json(err.value);
}

module.exports = {
    errorMiddleware:    errorMiddleware,
    handleError:        handleError,
}