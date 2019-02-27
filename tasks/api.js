// http://api.douban.com/v2/user/
// http://api.douban.com/v2/movie/subject/1764796

const rq = require('request-promise-native')

async function fetchMovie (item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  const res = await rq(url)

  return res
}

;(async () => {
  let movies = [
    {
      doubanId: 26266893,
      title: '流浪地球',
      rate: 7.9,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2545472803.jpg'
    },
    {
      doubanId: 25986662,
      title: '疯狂的外星人',
      rate: 6.4,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2541901817.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    try {
      movieData = JSON.parse(movieData)
    } catch (err) {
      console.log(err)
    }
    console.log(movieData)
  })
})()
