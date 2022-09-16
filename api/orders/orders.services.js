const Order = require('./orders.model');

function getAllOrders() {
  return Order.find({});
}

function getSingleOrder(id) {
  return Order.findById(id)
    .populate('host');
}

function createOrder(order) {
  return Order.create(order);
}

function getClientOrders(order) {
  const clientId = order.client;
  const clientName = order.name;
  return Order.find({ clientId: `${clientId}`, clientName: `${clientName}`});
}

function updateOrder(id, order) {
  return Order.findByIdAndUpdate(id, order, { new: true });
}

function deleteOrder(id) {
  return Order.findByIdAndRemove(id);
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  getClientOrders,
  updateOrder,
  deleteOrder,
};
