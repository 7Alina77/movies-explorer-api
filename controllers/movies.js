const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { HTTP_STATUS_CREATED } = require('../errors/handleErrors');
const BadRequestError = require('../errors/BadRequestError');

const { CastError, ValidationError } = mongoose.Error;

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(new NotFoundError('Фильмы не найдены'))
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const ownerId = req.user.id;
  const { country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({ country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        next(new BadRequestError('Данные для создания фильма некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма нет');
      }
      if (movie.owner._id.toString() !== req.user.id.toString()) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .populate('owner')
        .then((movieToDelete) => res.send(movieToDelete));
    })
    .catch(next);
};
