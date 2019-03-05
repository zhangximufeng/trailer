const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types
// 定义 schema
const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },

  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,
  movieTypes: [String],
  rawTitle: String,
  pubdate: Mixed,
  year: Number,
  tags: [String],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }

  }
})
movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
// 通过mongoose model 把 schema 发布出去

mongoose.model('Movie', movieSchema)
