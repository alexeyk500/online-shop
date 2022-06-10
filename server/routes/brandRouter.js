const Router = require('express');
const brandRouter = new Router();
const BrandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

brandRouter.post('/', checkRoleMiddleware('ADMIN'), BrandController.create);
brandRouter.delete('/:id', BrandController.delete);
brandRouter.get('/', BrandController.getAll);

module.exports = brandRouter;
