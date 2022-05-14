const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/apiError');

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + '.jpg';
      await img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      if (info) {
        const infoArray = JSON.parse(info);
        infoArray.forEach((infoItem) => {
          DeviceInfo.create({
            title: infoItem.title,
            description: infoItem.description,
            deviceId: device.id,
          });
        });
      }
      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;
    if (brandId && !typeId) {
      return res.json(await Device.findAndCountAll({ where: { brandId }, limit, offset }));
    }
    if (!brandId && typeId) {
      return res.json(await Device.findAndCountAll({ where: { typeId }, limit, offset }));
    }
    if (brandId && typeId) {
      return res.json(await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset }));
    }
    return res.json(await Device.findAndCountAll({ limit, offset }));
  }
  async getOne(req, res) {
    const { id } = req.params;
    console.log('id =', id);
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
