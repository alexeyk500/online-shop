const { Type } = require('../models/models');
const ApiError = require("../error/apiError");

class TypeController {

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      return next(ApiError.badRequest(e.original.detail));
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const count = await Type.destroy({ where: { id } });
    return res.json(count);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
