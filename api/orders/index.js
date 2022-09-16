const Router = require('express');
const { isAuthenticated, verifyRole } = require('../../auth/auth.service');

const {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getSingleOrderHandler,
  getClientOrdersHandler,
  updateOrderHandler,
} = require('./orders.controllers');

const router = Router();

router.get('/', isAuthenticated, verifyRole(['ADMIN']), getAllOrdersHandler);
router.post('/', isAuthenticated, verifyRole(['CLIENT']), createOrderHandler);
router.get('/:id', getSingleOrderHandler);
router.get('/byClientId/:clientId', isAuthenticated, verifyRole(['CLIENT']), getClientOrdersHandler);
router.patch('/:id', isAuthenticated, verifyRole(['ADMIN']), updateOrderHandler);
router.delete('/:id', isAuthenticated, verifyRole(['ADMIN']), deleteOrderHandler);

module.exports = router;
