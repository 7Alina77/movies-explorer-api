const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { SECRET_JWT_KEY = 'SECRET_JWT_KEY' } = process.env;

module.exports.getMe = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с данным email уже существует'));
        } else if (err.name === ValidationError) {
          next(new BadRequestError('Данные для создания пользователя некорректны'));
        } else {
          next(err);
        }
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        return res.send({
          name: user.name,
          email: user.email,
        });
      }
    })
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        next(new BadRequestError('Данные для обновления пользователя некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, SECRET_JWT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 36000000,
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch((err) => {
      if (err.name === 'UnauthorizedError') {
        next(new UnauthorizedError('Необходимо авторизоваться'));
      }
      next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из профиля' });
};
