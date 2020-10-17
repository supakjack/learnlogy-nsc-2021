module.exports = {
  get: (req, res, next) => {
    const data = 'test router get'
    res.send({ data })
  },
  post: (req, res, next) => {
    const data = 'test router post'
    res.send({ data })
  }
}
