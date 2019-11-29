
const handleError = (code, err) => {
    if (typeof err === 'string')
        return ({ status: code, value: {error: err} });
    return ({ status: code, value: {errors: err} });
}

const errorMiddleware = (err, req, res, next) => {
    res.status(err.status).json(err.value);
}

module.exports = {
    errorMiddleware:    errorMiddleware,
    handleError:        handleError,
}