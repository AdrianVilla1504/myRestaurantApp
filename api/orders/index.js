const Router = require('express');
const { isAuthenticated, verifyRole } = require('../../auth/auth.service');

const {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getSingleOrderHandler,
  getClientOrdersHandler,
  updateOrderHandler,
} = require('./orders.controller');

const router = Router();

router.get('/', getAllOrdersHandler);
router.post('/', isAuthenticated, verifyRole(['ADMIN']), createOrderHandler);
router.get('/:id', getSingleOrderHandler);
router.get('/byClientId/:client', getClientOrdersHandler);
router.patch('/:id', OrderValidator, isAuthenticated, verifyRole(['ADMIN']), updateOrderHandler);
router.delete('/:id', isAuthenticated, verifyRole(['ADMIN']), deleteOrderHandler);

module.exports = router;
