const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../service/user_service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            //public routes that don't require authentication
            '/user/authenticate',
            '/user/register'
        ]
    });
}

async function isRevoked(request, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token
    if (!user) {
        return done(null, true);
    }

    done();
}
