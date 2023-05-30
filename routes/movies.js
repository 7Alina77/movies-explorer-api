const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
  // likeMovie,
  // dislikeMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieById } = require('../validators/moviesValidator');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieById, deleteMovie);
//router.put('/:cardId/likes', validateMovieById, likeMovie);
//router.delete('/:cardId/likes', validateMovieById, dislikeMovie);

module.exports = router;
