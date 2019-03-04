const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'
mongoose.Promise = global.Promise

exports.connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }

  mongoose.connect(db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(db)
  })
  mongoose.connection.on('error', (err) => {
    console.log(err)
  })
  mongoose.connection.on('open', () => {
    console.log('数据库连接成功')
  })
}
