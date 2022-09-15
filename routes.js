const heatlRoute = require('./api/healthcheck/index');


function routes(app) {
  app.use('/api/healthcheck', heatlRoute);
}

module.exports = routes;
