require('dotenv').config();
const calculateOrderAmount = require('./stripe.services');
const STRIPEKEY = process.env.STRIPE_KEY;
const stripe =  require("stripe")(STRIPEKEY);

async function paymentTry(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = paymentTry;
