const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  getClientOrders,
  updateOrder,
  deleteOrder,
} = require('./orders.services');

async function getAllOrdersHandler(req, res) {
  try {
    const order = await getAllOrders();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getSingleOrderHandler(req, res) {
  const { id } = req.params;
  try {
    const Order = await getSingleOrder(id);

    if (!Order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(Order);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createOrderHandler(req, res) {
  const orderData = req.body;
  const { _id, name, phone} = req.user;
  console.log(orderData);
  try {
    const order = await createOrder({ ...orderData, clientId: _id, clientName: name, clientPhone: phone });
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ error });
  }
}

async function getClientOrdersHandler(req, res) {
  try {
    const clientId = req.params;
    console.log(clientId);
    const order = await getClientOrders(clientId);
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

async function updateOrderHandler(req, res) {
  const { id } = req.params;
  const OrderData = req.body;

  try {
    const Order = await updateOrder(id, OrderData);
    return res.status(200).json(Order);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteOrderHandler(req, res) {
  const { id } = req.params;
  try {
    const Order = await deleteOrder(id);

    if (!Order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    return res.json(Order);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getSingleOrderHandler,
  getClientOrdersHandler,
  updateOrderHandler,
};
