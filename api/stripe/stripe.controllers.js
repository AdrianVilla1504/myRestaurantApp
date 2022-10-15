require("dotenv").config();
const calculateOrderAmount = require("./stripe.services");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/* const sgMail = require("@sendgrid/mail");
console.log("API KEY",process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY); */

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

/*   const receiptemail = async () => {
    const product = items[0];
    const customername = profile.name;
    console.log(profile);
    const msg = {
      to: profile.email, // Change to your recipient
      from: "adriancvilla@gmail.com", // Change to your verified sender
      subject: "Receipt of your order",
      template_id: 'd-6e4e0084952946fabae7b74c4077bb3a',
      dynamic_template_data: {
        clientname: customername,
        phone: profile.phone,
        receiptItems: {item: product},
        totalcost: calculateOrderAmount(items)/100,
      }
    };

    try {
      await sgMail.send(msg);
      console.log("The e-mail has been sent to the client");
    } catch(error) {
      console.log(error);
    }
  }

  receiptemail(); */
}


/* async function invoicing(req, res)
{
  const { profile, items } = req.body;
  console.log("items", items)
  const itemsInvoice = items[0]
  const dataInvoice = 0;
  itemsInvoice.forEach( (item) => {
     dataInvoice.push({
      id: item._id,
      amount: (item.price)*100,
      amount_excluding_tax: (item.price*item.qty)*100,
      currency: "usd",
      price:{
        billing_scheme: "per_unit",
        currency: "usd",
        unit_amount: (item.price)*100,
      },
      quantity: item.qty,
      subscription: null,
     })
  })

 console.log(dataInvoice);

  const invoice = await stripe.invoices.create({
    customer_name: profile.name,
    customer_email: profile.email,
    lines: {
      object: "list",
      data: dataInvoice,
      has_more: false,
    },
    paid: true,
    status: "paid",
    subscription: null,
    subtotal: calculateOrderAmount(items),
    subtotal_excluding_tax: calculateOrderAmount(items),
    total: calculateOrderAmount(items),
    total_excluding_tax: calculateOrderAmount(items),
  });

  const invoiceToSend = await stripe.invoices.sendInvoice(invoice.id);

  res.send(invoiceToSend);

} */

/* const sendInvoice = async function (email) {
  // Look up a customer in your database
  let customer = CUSTOMERS.find(c => c.email === email);
  let customerId;
  if (!customer) {
    // Create a new Customer
    customer = await stripe.customers.create({
      email,
      description: 'Customer to invoice',
    });
    // Store the Customer ID in your database to use for future purchases
    CUSTOMERS.push({stripeId: customer.id, email: email});
    customerId = customer.id;
  } else {
    // Read the Customer ID from your database
    customerId = customer.stripeId;
  }

  // Create an Invoice
  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: 30,
  });

  // Create an Invoice Item with the Price, and Customer you want to charge
  const invoiceItem = await stripe.invoiceItems.create({
    customer: customerId,
    price: PRICES.basic,
    invoice: invoice.id
  });

  // Send the Invoice
  await stripe.invoices.sendInvoice(invoice.id);
}; */

module.exports = paymentTry;
