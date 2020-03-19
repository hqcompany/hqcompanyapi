require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const enviroment = process.env.NODE_ENV;
const stage = require('./config')[enviroment];

const routes = require('./src/routes/indexRoute.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (enviroment !== 'production') {
    app.use(logger('dev'));
}

// app.use('/api/v1', (req, res, next) => {
//     res.send('Auth nodejs api v1');
//     next();
// });

app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
