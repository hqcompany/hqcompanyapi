//src/routes/indexRoute.js

const user = require('./userRoute');

module.exports = router => {
    user(router);
    return router;
};
