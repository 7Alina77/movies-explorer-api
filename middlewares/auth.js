const jwt = require('jsonwebtoken');

const { SECRET_JWT_KEY = 'SECRET_JWT_KEY', NODE_ENV } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  const token = /** req.headers.authorization.replace('Bearer ', '') || */ req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_JWT_KEY : 'DEV_SECRET_KEY');
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
