const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./products.services');

async function getAllProductsHandler(req, res) {
  try {
    const product = await getAllProducts();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getSingleProductHandler(req, res) {
  const { id } = req.params;
  try {
    const product = await getSingleProduct(id);

    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createProductHandler(req, res) {
  const productData = req.body;
  const { _id } = req.user;
  try {
    const product = await createProduct({ ...productData, host: _id });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ error });
  }
}

async function updateProductHandler(req, res) {
  const { id } = req.params;
  const productData = req.body;

  try {
    const product = await updateProduct(id, productData);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteProductHandler(req, res) {
  const { id } = req.params;
  try {
    const product = await deleteProduct(id);

    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllProductsHandler,
  getSingleProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
