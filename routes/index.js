const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { validateLogin, validateSignUp } = require('../validators/userValidator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.post('/signout', logout);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
