const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com/subject/'
// const videoBase = 'http://vt1.doubanio.com/201902272054/2568c6c17f6ceb64060bf4829fb19dd6/view/movie/M/402410829.mp4'
// const videoBase = `https://movie.douban.com/trailer/`
const sleep = time => new Promise(resolve => { setTimeout(resolve, time) })

process.on('message', async movies => {
  console.log('start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()

  for (let i = 0; i < movies.length; i++) {
    let doubanId = movies[i].doubanId
    await page.goto(base + doubanId, {
      waitUntil: 'networkidle2'
    })
    await sleep(1000)

    const result = await page.evaluate(() => {
      var $ = window.$
      var it = $('.related-pic-video')
      if (it && it.length > 0) {
        var link = it.attr('href')
        var url = (url) => url //eslint-disable-line
        var cover = eval(it[0].style.backgroundImage) //eslint-disable-line

        return {
          link,
          cover
        }
      }
      return {}
    })

    let video

    if (result.link) {
      await page.goto(result.link, {
        waitUntil: 'networkidle2'
      })
      await sleep(2000)

      video = await page.evaluate(() => {
        var $ = window.$
        var it = $('source')

        if (it && it.length > 0) {
          return it.attr('src')
        }
        return ''
      })
    }

    const data = {
      video,
      doubanId,
      cover: result.cover
    }
    process.send(data)
  }

  browser.close()
  process.exit(0)
})
