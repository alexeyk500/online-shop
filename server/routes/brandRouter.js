const Router = require('express');
const brandRouter = new Router();
const BrandController = require('../controllers/brandController');

brandRouter.post('/', BrandController.create);
brandRouter.get('/', BrandController.getAll);

module.exports = brandRouter;
