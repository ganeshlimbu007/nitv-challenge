const AppError = require("../utils/appError")

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400);
}

const handleDuplicateErrorDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    //operational and trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else { //Programming or other unknown error: don't leak error
        console.log("error: ", err);
        res.status(500).json({
            status: 'error',
            message: "something went wrong!!!"
        })
    }
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.name = err.name || "errorName";

    if (process.env.NODE_ENV === "development") {
        console.log("error name:", err.name)
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateErrorDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }
}