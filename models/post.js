const mongoose = require('mongoose')
const {
  Schema
} = mongoose
const User = require('../models/user')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  owner: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post