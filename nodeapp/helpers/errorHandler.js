
const handleError = (code, err) => {
    if (typeof err === 'string')
        return ({ status: code, value: {error: err} });
    return ({ status: code, value: {errors: err} });
}

const errorMiddleware = (err, req, res, next) => {
    if (!err.status) {
        console.log(err);
        res.status(500).json('Internal Server Error.');
    }
    else
        res.status(err.status).json(err.value);
}

module.exports = {
    errorMiddleware:    errorMiddleware,
    handleError:        handleError,
}