module.exports = errorHandler;
function errorHandler(error, request, response, next) {
    if (typeof error === 'string') {
        let customApplicationError = response
            .status(400)
            .json({ message: error });
        return customApplicationError;
    }

    if (error.name === 'ValidationError') {
        let mongoooseValidationError = response
            .status(400)
            .json({ message: error.message });
        return mongoooseValidationError;
    }

    if (error.name === 'UnauthorizedError') {
        let jwtAuthenticationError = response
            .status(401)
            .json({ message: 'Invalid Token' });
        return jwtAuthenticationError;
    }

    let defaultError = response.status(500).json({ message: error.message });
    return defaultError;
}
