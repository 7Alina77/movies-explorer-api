const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { handleErrors } = require('./errors/handleErrors');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
