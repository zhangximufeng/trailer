const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
  console.log('*********!*******')
  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }
  const movies = await Movie.find(query)

  return movies
}

export const getAllMovieDetail = async (id) => {
  const movie = await Movie.findOne({ _id: id })
  return movie
}

export const getRelativeMovies = async (movie) => {
  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
  return movies
}
