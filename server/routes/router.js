const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

router.use('/test', (req, res) => {
  res.json({ message: 'Hello from server' });
});

module.exports = router;
