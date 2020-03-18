const userService = require('../service/user_service.js');
const loginService = require('../service/login_service.js');

const authenticate = (request, response, next) => {
    loginService
        .authenticate(request.body)
        .then(user =>
            user
                ? user.json(user)
                : response
                      .status(400)
                      .json({ message: 'Username or Password is incorrect.' })
        )
        .catch(error => next(error));
};

const register = (request, response, next) => {
    userService
        .createUser(request.body)
        .then(() => response.status(201).json({ message: 'Register Success.' }))
        .catch(error => next(error));
};

const getAll = (request, response, next) => {
    userService
        .getAllUsers()
        .then(users => response.status(200).json(users))
        .catch(error => next(error));
};

const getCurrent = (request, response, next) => {
    userService
        .getUserById(request.user.sub)
        .then(user =>
            user ? response.status(200).json(user) : response.sendStatus(404)
        )
        .catch(error => next(error));
};

const getById = (request, response, next) => {
    userService
        .getUserById(request.params.id)
        .then(user =>
            user ? response.status(200).json(user) : response.sendStatus(404)
        )
        .catch(error => next(error));
};

const update = (request, response, next) => {
    userService
        .updateUser(request.params.id, request.body)
        .then(() => response.status(200).json({ message: 'Update Success.' }))
        .catch(error => next(error));
};

const _delete = (request, response, next) => {
    const id = request.params.id;
    userService.deleteUser(id);
    then(() =>
        response.status(200).json({ message: `User ${id} was deleted.` })
    ).catch(error => next(error));
};

module.exports = {
    authenticate,
    register,
    getAll,
    getCurrent,
    getById,
    update,
    delete: _delete
};
