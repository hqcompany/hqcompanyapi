const jwt = require('jsonwebtoken');

module.exports = {
    validateToken
};

function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]; //Bearer token
        const options = {
            expiresIn: '2d',
            issuer: 'tester'
        };
        try {
            // verify makes sure that the token hasn't expired and has been issue
            result = jwt.verify(token, process.env.JWT_SECRET, options);

            // Let's pass back the decoded token to the request object
            req.decoded = result;
            next();
        } catch (error) {
            throw new Error(error);
        }
    } else {
        result = {
            error: 'Authentication error. Token required.',
            status: 401
        };
        res.status(401).send(result);
    }
}
