const { celebrate, Joi } = require('celebrate');
const { regExLink } = require('../utils/constants');

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().pattern(regExLink),
    trailerLink: Joi.string().required().pattern(regExLink),
    thumbnail: Joi.string().required().pattern(regExLink),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
