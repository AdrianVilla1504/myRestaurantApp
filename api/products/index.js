const Router = require('express');
const { isAuthenticated, verifyRole } = require('../../auth/auth.service');

const {
  getAllProductsHandler,
  getSingleProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require('./products.controllers');

const router = Router();

router.get('/', getAllProductsHandler);
router.post('/', isAuthenticated, verifyRole(['ADMIN']), createProductHandler);
router.get('/:id', getSingleProductHandler);
router.patch('/:id', isAuthenticated, verifyRole(['ADMIN']), updateProductHandler);
router.delete('/:id', isAuthenticated, verifyRole(['ADMIN']), deleteProductHandler);

module.exports = router;
