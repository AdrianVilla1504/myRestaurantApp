const heatlRoute = require('./api/healthcheck/index');
const user = require('./api/users/index');
const authLocal = require('./auth/local');


function routes(app) {
  app.use('/api/healthcheck', heatlRoute);
  app.use('/api/users', user);
  app.use('/auth/local', authLocal);


}

module.exports = routes;
