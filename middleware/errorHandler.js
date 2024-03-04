const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORISED:
            res.json({
                title: "Unauthorised",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_VALID:
            res.json({
                title: "Not valid",
                message: err.message,
                stacktrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server error",
                message: err.message,
                stacktrace: err.stack,
            });
            default:
                console.log("No error, all good");
    }
}

module.exports = errorHandler;