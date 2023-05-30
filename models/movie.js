const mongoose = require('mongoose');
const { regExLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => regExLink.test(url),
      message: 'Ссылка введена некорректно',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => regExLink.test(url),
      message: 'Ссылка введена некорректно',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => regExLink.test(url),
      message: 'Ссылка введена некорректно',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('movie', movieSchema);
