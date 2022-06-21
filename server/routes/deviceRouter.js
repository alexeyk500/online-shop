const Router = require('express');
const deviceRouter = new Router();
const DeviceController = require('../controllers/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

deviceRouter.post('/', checkRoleMiddleware('ADMIN'), DeviceController.create);
deviceRouter.get('/', DeviceController.getAll);
deviceRouter.get('/:id', DeviceController.getOne);
deviceRouter.delete('/:id', DeviceController.delete);

module.exports = deviceRouter;
