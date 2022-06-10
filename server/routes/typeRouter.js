const Router = require('express');
const typeRouter = new Router();
const TypeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

typeRouter.post('/', checkRoleMiddleware('ADMIN'), TypeController.create);
typeRouter.delete('/:id', TypeController.delete);
typeRouter.get('/', TypeController.getAll);

module.exports = typeRouter;
