const { roleModel } = require('../models/role.model')

module.exports = {
  get: async (req, res, next) => {
    try {
      const findRole = await roleModel.find()
      res.send(findRole)
    } catch (error) {
      next(error)
    }
  },
  add: async (req, res, next) => {
    try {
      const role = new roleModel(req.body)
      const saveRole = await role.save()
      res.send(saveRole)
    } catch (error) {
      next(error)
    }
  }
}
