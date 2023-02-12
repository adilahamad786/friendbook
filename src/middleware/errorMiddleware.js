const errorMiddleware = (error, req, res, next) => {
    error.errorType = error.errorType || "internal_error";
    error.message = error.message || "Internal Server Error";
    error.statusCode = error.statusCode || 500;

    if (error.code === "LIMIT_FILE_SIZE") {
        error.errorType = "bad_request";
        error.message = "File size is too much, please upload file less than 3MB!";
        error.statusCode = 400;
    }

    if (error.reason) {
        error.errorType = "bad_request";
        error.message = "Invalid request!";
        error.statusCode = 400;
    }

    if (error._message === 'User validation failed') {
        error.errorType = "bad_request";
        error.message = "Invalid update!";
        error.statusCode = 400;
    }

    if (error.errorType === "internal_error") {
        error.message = "Internal Server Error";
    }

    res.status(error.statusCode).json({
        error: {
            errorType: error.errorType,
            message: error.message
        }
    });
}

module.exports = errorMiddleware;