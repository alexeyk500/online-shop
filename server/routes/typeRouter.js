const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), TypeController.create);
router.delete('/:id', TypeController.delete);
router.get('/', TypeController.getAll);

module.exports = router;
