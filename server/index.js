const Koa = require('koa')
// const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('./database/init')
initSchemas()
const R = require('ramda')
const MIDDLEWARES = ['router']
require('babel-core/register')
require('babel-polyfill')
// const mongoose = require('mongoose')
// const router = require('./routes')
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

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )(MIDDLEWARES)
  )
}
