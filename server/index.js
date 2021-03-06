const Koa = require('koa')
// const views = require('koa-views')
const { join } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
initSchemas()
const R = require('ramda')
require('babel-core/register')
require('babel-polyfill')
const MIDDLEWARES = ['router', 'parcel']

// const mongoose = require('mongoose')
// const router = require('./routes')

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => join(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  await connect()

  await initAdmin()
  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')
  const app = new Koa()
  await useMiddlewares(app)
  app.listen(3000)
})()
