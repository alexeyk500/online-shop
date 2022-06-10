const { Brand } = require('../models/models');
const ApiError = require("../error/apiError");

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      return next(ApiError.badRequest(e.original.detail))
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const count = await Brand.destroy({ where: { id } });
    return res.json(count);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new BrandController();
