const express = require('express')
const mongoose = require('mongoose')
const Post = require('../models/post')
const postValidator = require('../validation/post')
const auth = require('../middlewares/auth')
const paginatedResults = require('../middlewares/pagination')
const router = new express.Router()

router.post('/newpost', auth, async (req, res) => {
  const {
    title,
    body,
    author,
    owner
  } = req.body

  const {
    errors,
    isValid
  } = postValidator(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const post = new Post({
      title,
      body,
      author,
      owner
    })
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    console.log(e)
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({
      createdAt: -1
    })
    return res.json(posts)
  } catch (e) {
    console.log(e)
  }
})

// Pagination
router.get('/pages', auth, paginatedResults(Post), (req, res) => {
  res.json(res.paginatedResults)
})

// Get a Single User's Posts
router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const post = await Post.findById(_id)
    res.json(post)
  } catch (e) {
    console.log(e)
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id
    })
    console.log(req.user._id)
    return res.json(posts)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router