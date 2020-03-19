//src/routes/userRoute.js

const controller = require('../controllers/userController');
const jwt = require('../middlewares/jwt');

module.exports = router => {
    router
        .route('/user')
        .post(controller.add)
        .get(jwt.validateToken, controller.getAll);

    router.route('/login').post(controller.login);
};
