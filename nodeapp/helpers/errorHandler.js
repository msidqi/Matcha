
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

/*
res.sendStatus() method that will set the HTTP status code,
and will send a string representation of the status code in the body.
This could be useful for 404s or 500s, where you don’t want to send
additional detail to the client, and just want a default string
representation of the status code to be sent.
*/