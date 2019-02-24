const Koa = require('koa')
const { htmlTpl, ejsTpl, pugTpl} = require('./tpl')
// const ejs = require('ejs')
const pug = require('pug')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = pug.render(pugTpl, {
    you: 'lukei',
    me: 'zhangximufeng'
  })

})

app.listen(3000)
