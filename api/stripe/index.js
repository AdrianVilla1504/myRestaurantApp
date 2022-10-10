const Router = require('express');
const paymentTry = require('./stripe.controllers');

const router = Router();

router.post("/createPaymentIntent", paymentTry );

module.exports = router;
