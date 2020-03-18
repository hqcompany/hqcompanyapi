require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./config/jwt');
// const router = require('./routes/user_route');
const router = require('./routes/routes');
const errorHandler = require('./config/error_handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// JWT auth
app.use(jwt());
// api routes
app.use(router);
// global error handler
app.use(errorHandler);

const PORT =
    process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
const server = app.listen(PORT, function initServer() {
    console.log(`Server listening on port ${PORT}`);
});
