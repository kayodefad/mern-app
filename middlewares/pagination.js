module.exports = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // const results = {}

    // if (endIndex < model.length) {
    //   results.next = {
    //     page: page + 1,
    //     limit
    //   }
    // }

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit
    //   }
    // }

    try {
      const results = await model.find().sort({
        createdAt: -1
      }).limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      console.log(e)
    }

  }
}