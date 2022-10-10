const healthRoute = require('./api/healthcheck/index');
const user = require('./api/users/index');
const authLocal = require('./auth/local');
const products = require('./api/products/index');
const orders = require('./api/orders/index');
const upload = require('./api/upload');
const stripe = require('./api/stripe/index');


function routes(app) {
  app.use('/api/healthcheck', healthRoute);
  app.use('/api/users', user);
  app.use('/api/products', products);
  app.use('/auth/local', authLocal);
  app.use('/api/orders', orders);
  app.use('/api/upload', upload);
  app.use('/api/stripe', stripe);
}

module.exports = routes;
