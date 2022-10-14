const Router = require('express');
const {paymentTry, receiptemail} = require('./stripe.controllers');

const router = Router();

router.post("/createPaymentIntent", paymentTry);
router.post("/generateOrderReceipt", receiptemail);

module.exports = router;
