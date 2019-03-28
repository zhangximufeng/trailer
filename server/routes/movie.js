const mongoose = require('mongoose')
const { getAllMovies } = require('../service/movie')
const { controller, get, post, put } = require('../lib/decorator')

@controller('/api/v0/movies')
export class movieController {

  @get('/')
  async getMovies (ctx, next) {
      const { type, year } = ctx.query
      console.log(type,year)
      const movies = await getAllMovies(type,year)

      ctx.body = {
        movies
      }
    }
    // @post
    // @required({body: ['username', 'doubanId']})
  // @get('/:id')
  // async getMovieDetail (ctx, next) {
  //     const Movie = mongoose.model('Movie')
  //     const id = ctx.params.id
  //     const movie = await getMovieDetail(id)
  //     const relativeMovies = await getRelativeMovies(movie)
  //
  //     ctx.body = {
  //       data: {
  //         movie,
  //         relativeMovies
  //       }
  //   }
  // }

}
