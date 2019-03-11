const mongoose = require('mongoose')
const { getAllMovies } = require('../service/movie')
const { controller, get, post, put } = require('../lib/decorator')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  @login()
  @admin(['developer'])
  @log
  async getMovies (ctx, next) {
      const { type, year } = require(ctx.query)
      const movies = await getAllMovies(type, year)

      ctx.body = {
        movies
      }
    })
  }

// @post
// @required({body: ['username', 'doubanId']})
@get('/:id')
async getMovieDetail (ctx, next) {
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id
    const movie = await Movie.find({
      _id: id
    })

    ctx.body = {
      movie
    }
  }
}
