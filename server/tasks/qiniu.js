
const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket = config.qiniu.bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201902282107/463ba5d2e39de4f8dc9e1583043f8d45/view/movie/M/402420330.mp4',
    doubanId: '26266893',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2546089641.jpg?',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2545472803.jpg'
  }]
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')

        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }

        console.log(movie)
        {
          video:'http://vt1.doubanio.com/201902282107/463ba5d2e39de4f8dc9e1583043f8d45/view/movie/M/402420330.mp4',
          doubanId: '26266893',
          cover:'https://img3.doubanio.com/img/trailer/medium/2546089641.jpg?',
          poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2545472803.jpg',
          videoKey: 'http://qiniu.zhangximufeng.cn/cfXvlKZd19-UA_kH1snNg.mp4',
          coverKey: 'http://qiniu.zhangximufeng.cn/USXMiBeKdfPoKSH98VVYU.jpg',
          posterKey: 'http://qiniu.zhangximufeng.cn/-1MMENupwKlQX7FA3SMaK.jpg' 
      }
      } catch (err) {
        console.log(err)
      }
    }
  })
})()
