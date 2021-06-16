const Movie = require("../models/movieModel");

class MovieService {
  getMovies() {
    const query = Movie.find();
    return query;
  }

  getMovieById(id) {
    const movie = Movie.findOne({ _id: id }).exec();
    return movie;
  }

  addMovie(data) {
    const newMovie = new Movie(data);
    return newMovie.save();
  }

  modifyMovie(id, data) {
    const movie = Movie.findOneAndUpdate({ _id: id }, data).exec();
    return movie;
  }

  deleteMovie(id) {
    const query = Movie.deleteOne({ _id: id }).exec();
    return query;
  }
}

module.exports = MovieService;
