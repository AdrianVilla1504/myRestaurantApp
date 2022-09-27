const Product = require('./products.model');

function getAllProducts() {
  return Product.find({});
}

function getSingleProduct(id) {
  return Product.findById(id)
}

function createProduct(product) {
  return Product.create(product);
}

function updateProduct(id, product) {
  return Product.findByIdAndUpdate(id, product, { new: true });
}

function deleteProduct(id) {
  return Product.findByIdAndRemove(id);
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
