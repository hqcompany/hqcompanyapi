//src/controler/userController.js

const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let MONGO_CONNECTION_URL = process.env.MONGODB_URL;
console.log(MONGO_CONNECTION_URL);

module.exports = {
    add,
    login,
    getAll
};

function add(req, res) {
    mongoose.connect(
        MONGO_CONNECTION_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        function(err) {
            let result = {};
            let status = 201;
            if (!err) {
                const { name, password } = req.body;
                const user = new User({ name, password });

                user.save((err, user) => {
                    if (!err) {
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
    );
    return;
}

function login(req, res) {
    const { name, password } = req.body;
    // Connect MongoDB at default port 27017.
    mongoose.connect(
        MONGO_CONNECTION_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        err => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({ name }, (err, user) => {
                    if (!err && user) {
                        bcrypt
                            .compare(password, user.password)
                            .then(match => {
                                if (match) {
                                    status = 200;
                                    // create a token
                                    const payload = { user: user.name };
                                    const options = {
                                        expiresIn: '2d',
                                        issuer: 'tester'
                                    };
                                    const secret = process.env.JWT_SECRET;
                                    const token = jwt.sign(
                                        payload,
                                        secret,
                                        options
                                    );
                                    result.token = token;
                                    result.status = status;
                                    result.result = user;
                                } else {
                                    status = 401;
                                    result.status = status;
                                    result.error = 'Authentication error';
                                }
                                res.status(status).send(result);
                            })
                            .catch(err => {
                                status = 500;
                                result.status = status;
                                result.error = err;
                                res.status(status).send(result);
                            });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
    );
}

function getAll(req, res) {
    // Connect MongoDB at default port 27017.
    mongoose.connect(
        MONGO_CONNECTION_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        err => {
            let result = {};
            let status = 200;
            if (!err) {
                const payload = req.decoded;
                if (payload && payload.user === 'admin') {
                    User.find({}, (err, users) => {
                        if (!err) {
                            result.status = status;
                            result.err = err;
                            result.result = users;
                        } else {
                            status = 500;
                            result.status = status;
                            result.error = err;
                        }
                        res.status(status).send(result);
                    });
                } else {
                    status = 401;
                    result.status = status;
                    result.error = 'Authentication error';
                    res.status(status).send(result);
                }
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
    );
}
