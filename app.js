require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const { handleErrors } = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB, PROD_MODE, PORT_DEFAULT } = require('./utils/config');

const app = express();
const { PORT = 3000, NODE_ENV, PRODUCTION_URL } = process.env;
// const { NODE_ENV, PRODUCTION_URL } = process.env;
// const { PORT = 3002 } = process.env;

mongoose.connect(NODE_ENV === PROD_MODE ? PRODUCTION_URL : DB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsAllowed = {
  origin: [
    'http://192.168.1.103:3001/',
    'http://localhost:3000/',
    'http://localhost:3001/',
    'http://127.0.0.1:3000/',
    'http://127.0.0.1:3001/',
    'http://alina-movies-dipl.nomoredomains.rocks/',
    'https://alina-movies-dipl.nomoredomains.rocks/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsAllowed));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT || PORT_DEFAULT);
