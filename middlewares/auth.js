const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = auth = async(req, res, next) => {
  const token = req.header('Authorization').split(' ')[1]

  const decoded = jwt.verify(token, process.env.secretOrKey)

  const user = User.findOne({_id: decoded._id})

  req.user = user

  req.user._id = decoded._id

  next()
}