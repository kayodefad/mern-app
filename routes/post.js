const express = require('express')
const mongoose = require('mongoose')
const Post = require('../models/post')
const postValidator = require('../validation/post')
const auth = require('../middlewares/auth')
const paginatedResults = require('../middlewares/pagination')
const router = new express.Router()

// New post route
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

// Get all posts route
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

// Get a Single Post
router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const post = await Post.findById(_id)

    if (!post) {
      return res.status(404).json({
        error: 'This post does not exist'
      })
    }

    res.json(post)
  } catch (e) {
    console.log(e)
  }
})

// Edit a single post
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)

  const {
    errors,
    isValid
  } = postValidator(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id
    })

    updates.forEach(update => post[update] = req.body[update])
    await post.save()
    res.json(post)
  } catch (e) {
    console.log(e)
  }
})

// Delete a single post 
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    })

    res.json({
      message: 'Delete successful'
    })
  } catch (e) {
    console.log(e)
  }
})

// Get all posts of a single user
router.get('/me/:id', auth, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id
    }).sort({
      createdAt: -1
    })
    return res.json(posts)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router