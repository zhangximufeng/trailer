require('babel-core/register')
require('babel-polyfill')
// require('./assets/common.sass')

function changeTitle () {
  window.$('#app').html('Parcel 大宝宝')
}

setTimeout(function () {
  changeTitle()
}, 2000)
