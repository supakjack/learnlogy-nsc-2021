const joi = require('@hapi/joi')

const registerSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required()
})

const loginSchema = joi.object({
  username: joi.string().lowercase().required(),
  password: joi.string().min(2).required()
})

module.exports = {
  registerSchema,
  loginSchema
}
