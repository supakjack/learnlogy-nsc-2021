const createError = require('http-errors')
const { userModel } = require('./../models/user.model')
const {
  registerSchema,
  loginSchema
} = require('./../helpers/validation_schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} = require('./../helpers/jwt_helper')
const client = require('./../helpers/init_redis')

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await registerSchema.validateAsync(req.body)

      const doesExist = await userModel
        .findOne()
        .or([{ username: result.username }, { email: result.email }])
      if (doesExist)
        throw createError.Conflict(
          `${
            doesExist.email==result.email
              ? doesExist.email + ' (email) '
              : '' || doesExist.username==result.username
              ? doesExist.username + ' (username) '
              : ''
          } is already been register`
        )

      const user = new userModel(result)
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)
      const refreshToken = await signRefreshToken(savedUser.id)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body)
      const user = await userModel.findOne({ username: result.username })

      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)

      res.send({ accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      next(error)
    }
  }
}
