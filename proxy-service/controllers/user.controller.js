module.exports = {
  login: (req, res, next) => {
    const data = { message: 'login', data: req.body }
    res.send({ data })
  },
  logout: (req, res, next) => {
    const data = 'logout'
    res.send({ data })
  },
  regisster: (req, res, next) => {
    const data = { message: 'register', data: req.body }
    res.send({ data })
  },
  refreshToken: (req, res, next) => {
    const data = { message: 'refreshToken', data: req.body }
    res.send({ data })
  }
}
