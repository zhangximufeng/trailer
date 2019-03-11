const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/douban-test'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'zhangximufeng'
  })
  if (!user) {
    user = new User({
      username: 'zhangximufeng',
      email: 'zhangximufeng@gmail.com',
      password: '123456'
    })
    await user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接错误！')
      }
    })
    mongoose.connection.on('error', (err) => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库连接错误！', err)
      }
    })
    mongoose.connection.on('open', () => {
      resolve()
      console.log('数据库连接成功')
    })
  })
}
