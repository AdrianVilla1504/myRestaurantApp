require("dotenv").config();
const calculateOrderAmount = require("./stripe.services");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function paymentTry(req, res) {
  const { profile, items } = req.body;
  const cemail = profile.email;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: cemail,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

const receiptemail = async (req) => {
  const { profile, cart } = req.body;
  let controllerSent = 0;

  let totalCost = 0;
  cart?.forEach((product) => {
    totalCost += product.price * product.qty;
  });

  console.log("profile receipt", profile);
  console.log("Products receipt", cart);
  console.log("Total to pay:", totalCost);

  const msg = {
    to: profile.email, // Change to your recipient
    from: process.env.SENDGRID_RECEIPT_ADDRESS, // Change to your verified sender
    subject: "Here is your order receipt",
    template_id: "d-6e4e0084952946fabae7b74c4077bb3a",
    dynamic_template_data: {
      clientname: profile?.name,
      phone: profile.phone,
      receiptItems: { item: cart },
      totalcost: totalCost,
    },
  };

  try {
    await sgMail.send(msg);
    console.log("The e-mail has been sent to the client");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { paymentTry, receiptemail };
