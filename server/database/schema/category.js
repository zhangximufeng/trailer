const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
// 定义 schema
const categorySchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie'
  }],
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
categorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
// 通过mongoose model 把 schema 发布出去
mongoose.model('Category', categorySchema)
